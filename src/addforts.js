// server.js (Node.js with Express example)
const express = require('express');
const mongoose = require('mongoose');
const Fort = require('./models/fort'); // Assuming you have a Fort model
const app = express();

mongoose.connect('mongodb://your_mongo_db_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/api/forts/:type', async (req, res) => {
    const fortType = req.params.type;
    try {
        const forts = await Fort.find({ type: fortType });
        res.json(forts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
