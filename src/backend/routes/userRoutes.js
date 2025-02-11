const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
    const { username, email, uid, photoURL } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email already exists." });
        }

        const newUser = new User({ username, email, uid, photoURL });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to save user data", error });
    }
});

router.get("/:uid", async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await User.findOne({ uid });
        if (user) {
            res.json({ 
                username: user.username, 
                photoURL: user.photoURL // Include photoURL in response
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
