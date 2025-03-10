const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const CommentModel = require("../models/comment");
const UserModel = require("../models/user");
const FortModel = require("../models/forts");  // ✅ Import FortModel

// ✅ 1. Add a Comment to a Fort
router.post("/fort/:fortName/comment", async (req, res) => {
    const { uid, username, photoURL, comment } = req.body;
    if (!uid || !comment) return res.status(400).json({ message: "User and comment are required" });

    try {
        const fortName = req.params.fortName.toLowerCase();
        const fort = await FortModel.findOne({ name: new RegExp(fortName, "i") });
        if (!fort) return res.status(404).json({ message: "Fort not found" });

        const newComment = await CommentModel.create({
            fortId: fort._id,
            userId: uid,
            username,
            photoURL,
            comment,
            likes: [],
            replies: [],
            createdAt: new Date(),
        });

        // 🔹 Save comment in fort's comments array
        await FortModel.findByIdAndUpdate(fort._id, { $push: { comments: newComment._id } });

        // 🔹 Save comment in user’s comments array
        await UserModel.findOneAndUpdate({ uid }, { $push: { comments: newComment._id } });

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ 2. Like or Unlike a Comment
router.post("/:commentId/like", async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ message: "User ID required" });

    try {
        let comment = await CommentModel.findOne({
            $or: [{ _id: req.params.commentId }, { "replies._id": req.params.commentId }]
        });

        if (!comment) return res.status(404).json({ message: "Comment/Reply not found" });

        let target = comment._id.toString() === req.params.commentId
            ? comment  // It's a top-level comment
            : comment.replies.find(reply => reply._id.toString() === req.params.commentId); // It's a reply

        if (!target) return res.status(404).json({ message: "Reply not found" });

        const userIdStr = uid.toString();
        const hasLiked = target.likes.includes(userIdStr);

        if (hasLiked) {
            target.likes = target.likes.filter(id => id !== userIdStr);
        } else {
            target.likes.push(userIdStr);
        }

        await comment.save();
        res.status(200).json({ message: hasLiked ? "Like removed" : "Liked" });

    } catch (error) {
        console.error("Error liking comment/reply:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ 3. Reply to a Comment
router.post("/:commentId/reply", async (req, res) => {
    const { uid, username, photoURL, comment } = req.body;
    if (!uid || !comment) return res.status(400).json({ message: "User and comment are required" });

    try {
        const findParentComment = async (comments) => {
            for (let comment of comments) {
                if (comment._id.toString() === req.params.commentId) return comment;
                const found = findParentComment(comment.replies);
                if (found) return found;
            }
            return null;
        };

        const parentComment = await CommentModel.findOne({ "replies._id": req.params.commentId }) || await CommentModel.findById(req.params.commentId);
        if (!parentComment) return res.status(404).json({ message: "Parent comment not found" });

        const newReply = {
            userId: uid,
            username,
            photoURL,
            comment,
            likes: [],
            replies: [],
            createdAt: new Date()
        };

        // ✅ If replying to a reply, find the correct reply object and store it inside its `replies` array
        if (parentComment.replies.some(reply => reply._id.toString() === req.params.commentId)) {
            const replyIndex = parentComment.replies.findIndex(reply => reply._id.toString() === req.params.commentId);
            parentComment.replies[replyIndex].replies.push(newReply);
        } else {
            parentComment.replies.push(newReply);
        }

        await parentComment.save();

        res.status(201).json(newReply);
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ 4. Delete a Comment
router.delete("/:commentId", async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ message: "User ID required" });

    try {
        let comment = await CommentModel.findOne({
            $or: [{ _id: req.params.commentId }, { "replies._id": req.params.commentId }]
        });

        if (!comment) return res.status(404).json({ message: "Comment/Reply not found" });

        if (comment._id.toString() === req.params.commentId) {
            // It's a top-level comment, delete it
            if (comment.userId.toString() !== uid) return res.status(403).json({ message: "Unauthorized" });
            await CommentModel.findByIdAndDelete(req.params.commentId);
        } else {
            // It's a reply, find and remove it
            comment.replies = comment.replies.filter(reply => reply._id.toString() !== req.params.commentId);
            await comment.save();
        }

        res.status(200).json({ message: "Comment/Reply deleted successfully" });

    } catch (error) {
        console.error("Error deleting comment/reply:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ 5. Get All Comments for a Fort
router.get("/fort/:fortName/comments", async (req, res) => {
    try {
        const fort = await FortModel.findOne({ name: new RegExp(`^${req.params.fortName}$`, "i") });

        if (!fort) {
            return res.status(404).json({ message: "Fort not found" });
        }

        let comments = await CommentModel.find({ fortId: fort._id })
            .populate("userId", "username photoURL")
            .lean();

        // ✅ Ensure all nested replies are properly included
        const processReplies = (replies) => {
            return replies.map(reply => ({
                ...reply,
                replies: reply.replies ? processReplies(reply.replies) : []
            }));
        };

        comments = comments.map(comment => ({
            ...comment,
            replies: processReplies(comment.replies)
        }));

        res.status(200).json(comments);

    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
});


module.exports = router;