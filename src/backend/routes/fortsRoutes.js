// backend/routes/fortsRoutes.js
const express = require('express');
const FortModel = require('../models/forts');  // Import the Fort model

const router = express.Router();

// Route to get all forts
router.get('/', async (req, res) => {
    try {
        const forts = await FortModel.find();  // Get all forts from the database
        res.json(forts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching forts', error: err });
    }
});

// Route to get forts by type (e.g., hill, coastal)
router.get('/:type', async (req, res) => {
    const type = req.params.type.trim().toLowerCase(); // Normalize and trim
    try {
        const forts = await FortModel.find({ type: { $regex: new RegExp(`^${type}$`, 'i') } });
        res.json(forts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching forts by type', error: err });
    }
});

module.exports = router;
