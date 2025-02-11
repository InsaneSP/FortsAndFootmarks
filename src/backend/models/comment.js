const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    fortName: { type: mongoose.Schema.Types.ObjectId, ref: "Fort", required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    replies:[{
        username: { type: String, required: true },
        commentId: { type: mongoose.Schema.Types.ObjectId, required: true },
        reply: { type: String, required: true },
        createdAt: { type: Date, default: Date.now() }
    }],
    createdAt: { type: Date, default: Date.now() }
},
{
    timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;