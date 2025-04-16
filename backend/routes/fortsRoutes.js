const express = require('express');
const FortModel = require('../models/forts');
const upload = require("../middleware/multer");
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
        let forts;

        if (type === "short") {
            forts = await FortModel.find({
                durationOfTrek: { $nin: ["1 day", "2 days"] }
            });
        } else {
            forts = await FortModel.find({ 
                $or: [
                    { type: { $regex: new RegExp(`^${type}$`, 'i') } },
                    { 'bestTimeToVisit.season': { $regex: new RegExp(`(^|,\\s*)${type}(\\s*,|$)`, 'i') }},
                    { difficulty: { $regex: new RegExp(`^${type}$`, 'i') } },
                    { experience: { $in: [new RegExp(`^${type}$`, 'i'), type] } },
                    { durationOfTrek: { $regex: new RegExp(`^${type}$`, 'i') } },
                ]
            });
        }

        res.json(forts);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching forts by type', error: err.message });
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

        if (!req.file || !(req.file.path || req.file.secure_url)) {
            console.error("❌ No file uploaded or invalid file path");
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const newImage = {
            url: req.file.path || req.file.secure_url,
            uploadedBy: username || "Anonymous",
            photoURL: userPhoto || "",
            uploadedAt: new Date()
        };        

        fort.gallery.push(newImage);
        await fort.save();

        console.log("✅ Image saved in MongoDB:", newImage);
        res.status(201).json({ message: "Image uploaded successfully", image: newImage });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;