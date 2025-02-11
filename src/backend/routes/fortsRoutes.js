const express = require('express');
const FortModel = require('../models/forts');
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

module.exports = router;