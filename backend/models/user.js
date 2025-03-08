const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String },
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],  // 🔹 Use `comments`
    likedComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
