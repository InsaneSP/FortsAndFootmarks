const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Add a comment
router.post("/comments", async (req, res) => {
    const { fortName, username, comment } = req.body;

    try {
        if (!fortName || !username || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newComment = new Comment({
            fortName,
            username,
            comment,
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error("Error saving comment:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get all comments for a fort
router.get("/:fortName", async (req, res) => {
    const { fortName } = req.params;
    try {
        const comments = await Comment.find({ fortName });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
