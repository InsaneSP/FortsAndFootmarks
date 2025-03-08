const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    photoURL: { type: String, default: "/default-avatar.png" },
    comment: { type: String, required: true },
    likes: [{ type: String }],
    replies: [this], // ✅ Allow replies inside replies (recursive schema)
    createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new mongoose.Schema({
    fortId: { type: mongoose.Schema.Types.ObjectId, ref: "forts", required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    photoURL: { type: String },
    comment: { type: String, required: true },
    likes: [{ type: String }],
    replies: [ReplySchema], // ✅ Replies can be nested
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
