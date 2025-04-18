const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const CommentModel = require("../models/comment");
const UserModel = require("../models/user");
const FortModel = require("../models/forts");
const Filter = require("bad-words");
const customHindiBadWords = require("../utils/badwords");

const filter = new Filter();
filter.addWords(...customHindiBadWords);

const checkProfanity = async (text) => {
    const localProfane = filter.isProfane(text);

    const purgoURL = `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(text)}`;
    let purgoProfane = false;

    try {
        const response = await axios.get(purgoURL);
        purgoProfane = response.data === true || response.data === "true";
    } catch (error) {
        console.warn("PurgoMalum API failed. Skipping online check.");
    }

    return localProfane || purgoProfane;
};

const findReplyRecursively = (replies, replyId) => {
    for (const reply of replies) {
        if (reply._id.toString() === replyId) return reply;
        if (reply.replies?.length > 0) {
            const found = findReplyRecursively(reply.replies, replyId);
            if (found) return found;
        }
    }
    return null;
};

const addReplyRecursively = (replies, parentId, newReply) => {
    for (let reply of replies) {
        if (reply._id.toString() === parentId.toString()) {
            reply.replies.push(newReply);
            return true;
        } else if (reply.replies && reply.replies.length > 0) {
            const added = addReplyRecursively(reply.replies, parentId, newReply);
            if (added) return true;
        }
    }
    return false;
};

const removeReplyById = (replies, idToRemove) => {
    return replies.filter(reply => {
        if (reply._id.toString() === idToRemove) return false;
        if (reply.replies) {
            reply.replies = removeReplyById(reply.replies, idToRemove);
        }
        return true;
    });
};

// ✅ 1. Add a Comment to a Fort
router.post("/fort/:fortName/comment", async (req, res) => {
    const { uid, username, photoURL, comment } = req.body;
    if (!uid || !comment) return res.status(400).json({ message: "User and comment are required" });

    const isProfane = await checkProfanity(comment);
    if (isProfane) {
        return res.status(400).json({ message: "Your comment contains inappropriate language. Please revise it." });
    }

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

        await FortModel.findByIdAndUpdate(fort._id, { $push: { comments: newComment._id } });
        await UserModel.findOneAndUpdate({ uid }, { $push: { comments: newComment._id } });

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ 2. Like or Unlike a Comment or Reply
router.post("/:commentId/like", async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ message: "User ID required" });

    try {
        let comment = await CommentModel.findOne({
            $or: [{ _id: req.params.commentId }, { "replies._id": req.params.commentId }]
        });

        if (!comment) return res.status(404).json({ message: "Comment/Reply not found" });

        let target;
        if (comment._id.toString() === req.params.commentId) {
            target = comment;
        } else {
            target = findReplyRecursively(comment.replies, req.params.commentId);
        }

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

// ✅ 3. Reply to a Comment or Reply
router.post("/:commentId/reply", async (req, res) => {
    const { uid, username, photoURL, comment } = req.body;
    if (!uid || !comment) return res.status(400).json({ message: "User and comment are required" });

    const isProfane = await checkProfanity(comment);
    if (isProfane) {
        return res.status(400).json({ message: "Your reply contains inappropriate language. Please revise it." });
    }

    try {
        let commentDoc = await CommentModel.findOne({
            $or: [{ _id: req.params.commentId }, { "replies._id": req.params.commentId }]
        }) || await CommentModel.findById(req.params.commentId);

        if (!commentDoc) return res.status(404).json({ message: "Comment not found" });

        const newReply = {
            _id: new mongoose.Types.ObjectId(),
            userId: uid,
            username,
            photoURL,
            comment,
            likes: [],
            replies: [],
            createdAt: new Date()
        };

        if (commentDoc._id.toString() === req.params.commentId) {
            commentDoc.replies.push(newReply);
        } else {
            const added = addReplyRecursively(commentDoc.replies, req.params.commentId, newReply);
            if (!added) return res.status(404).json({ message: "Could not find parent reply" });
        }

        await commentDoc.save();
        res.status(201).json(newReply);

    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ 4. Delete a Comment or Reply
router.delete("/:commentId", async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ message: "User ID required" });

    try {
        let comment = await CommentModel.findOne({
            $or: [{ _id: req.params.commentId }, { "replies._id": req.params.commentId }]
        });

        if (!comment) return res.status(404).json({ message: "Comment/Reply not found" });

        if (comment._id.toString() === req.params.commentId) {
            if (comment.userId.toString() !== uid) return res.status(403).json({ message: "Unauthorized" });
            await CommentModel.findByIdAndDelete(req.params.commentId);
        } else {
            comment.replies = removeReplyById(comment.replies, req.params.commentId);
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
