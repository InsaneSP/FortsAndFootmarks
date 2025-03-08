const express = require("express");
const router = express.Router();
const UserModel = require("../models/user"); // ✅ Fix: Ensure correct import
const CommentModel = require("../models/comment");
const FortModel = require("../models/forts");  // Ensure correct path & name

router.post("/", async (req, res) => {
    const { username, email, uid, photoURL } = req.body;

    try {
        let user = await UserModel.findOne({ uid });

        if (user) {
            // ✅ Update existing user's profile picture if changed
            user.photoURL = photoURL;
            await user.save();
            return res.status(200).json({ message: "User updated", user });
        }

        user = new UserModel({ username, email, uid, photoURL });
        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Failed to save user data:", error);
        res.status(500).json({ message: "Failed to save user data", error });
    }
});

router.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        console.log("Fetching user profile for UID:", uid);

        const user = await UserModel.findOne({ uid });
        if (!user) {
            console.log("User not found:", uid);
            return res.status(404).json({ message: "User not found" });
        }

        // 🔹 Fetch User's Comments with Related Forts
        const comments = await CommentModel.find({ userId: uid }).populate("fortId", "name");

        // 🔹 Fetch User's Replies (inside other comments)
        const replies = await CommentModel.find({ "replies.userId": uid })
            .populate("fortId", "name")
            .lean(); // Convert Mongoose document to plain JavaScript object

        // Extract user's replies from the comment documents
        let userReplies = [];
        replies.forEach(comment => {
            comment.replies.forEach(reply => {
                if (reply.userId === uid) {
                    userReplies.push({
                        _id: reply._id,
                        fortId: comment.fortId,
                        comment: reply.comment,
                        likes: reply.likes,
                        createdAt: reply.createdAt
                    });
                }
            });
        });

        // 🔹 Calculate Total Likes Received (including replies)
        const totalLikes = [
            ...comments.map(comment => comment.likes?.length || 0),
            ...userReplies.map(reply => reply.likes?.length || 0)
        ].reduce((sum, likes) => sum + likes, 0);

        res.json({
            username: user.username,
            email: user.email,
            photoURL: user.photoURL,
            comments,
            replies: userReplies,
            totalLikes,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.put("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const { username, photoURL } = req.body;

        const user = await UserModel.findOne({ uid });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update fields
        if (username) user.username = username;
        if (photoURL) user.photoURL = photoURL;
        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

module.exports = router;