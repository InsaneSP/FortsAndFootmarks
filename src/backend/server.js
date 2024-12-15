require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const FortModel = require('./models/forts');
const fortRoutes = require('./routes/fortsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/forts', fortRoutes);
app.use('/auth', authRoutes);

app.get('/fort/:fortName', (req, res) => {
    const fortName = req.params.fortName.toLowerCase(); 
    FortModel.findOne({ name: new RegExp(fortName, 'i') })
        .then(fort => {
            if (!fort) {
                return res.status(404).send('Fort not found');
            }
            res.json(fort);
        })
        .catch(err => res.status(500).send('Error fetching fort details'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
