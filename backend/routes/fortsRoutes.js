const express = require('express');
const FortModel = require('../models/forts');
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary"); // ✅ Import Cloudinary
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const forts = await FortModel.find();  
        res.json(forts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching forts', error: err });
    }
});

router.get('/:type', async (req, res) => {
    const type = req.params.type.trim().toLowerCase();
    try {
        const forts = await FortModel.find({ 
            $or: [
                { type: { $regex: new RegExp(`^${type}$`, 'i') } },
                { 'bestTimeToVisit.season': { $in: [new RegExp(`^${type}$`, 'i')] } },
                { difficulty: { $regex: new RegExp(`^${type}$`, 'i') } },
                { experience: { $in: [new RegExp(`^${type}$`, 'i'), type] } },
                { durationOfTrek: { $regex: new RegExp(`^${type}$`, 'i') } },
            ]
        });
        res.json(forts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching forts by type', error: err });
    }
});

// ✅ Upload User Image for a Fort
router.post("/:fortName/upload", upload.single("image"), async (req, res) => {
    try {
        console.log("📸 Received image upload request for:", req.params.fortName);
        console.log("📌 Request Body:", req.body);
        console.log("📂 Uploaded File:", req.file);

        const { username, userPhoto } = req.body;
        const fortName = req.params.fortName.toLowerCase();

        // ✅ Check if Fort Exists
        const fort = await FortModel.findOne({ name: new RegExp(fortName, "i") });
        if (!fort) {
            console.error("❌ Fort not found:", fortName);
            return res.status(404).json({ message: "Fort not found" });
        }

        if (!req.file || !req.file.path) {
            console.error("❌ No file uploaded or invalid file path");
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("✅ Cloudinary Upload Success:", req.file.path);

        // ✅ Store Image in MongoDB (Use `gallery` key)
        const newImage = {
            url: req.file.path, 
            uploadedBy: username || "Anonymous",
            photoURL: userPhoto || "",
            uploadedAt: new Date()
        };

        fort.gallery.push(newImage); // ✅ Use `gallery` key, not `photos`
        await fort.save();

        console.log("✅ Image saved in MongoDB:", newImage);
        res.status(201).json({ message: "Image uploaded successfully", image: newImage });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;