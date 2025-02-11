require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const FortModel = require('./models/forts');
const fortRoutes = require('./routes/fortsRoutes');
// const commentRoutes = require('./routes/commentsRoutes');
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/forts', fortRoutes);
// app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

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

app.post("/fort/:fortName", async (req, res) => {
    const fortName = req.params.fortName.toLowerCase();
    const { username, photoURL, comment } = req.body;
    if (!username || !comment) {
        return res.status(400).json({ message: "Username and comment are required" });
    }

    try {
        const updatedFort = await FortModel.findOneAndUpdate(
            { name: new RegExp(fortName, 'i') },
            { $push: { comments: { username, photoURL, comment, createdAt: new Date() } } },
            { new: true }
        );        

        if (!updatedFort) {
            return res.status(404).json({ message: "Fort not found" });
        }

        res.status(200).json(updatedFort.comments);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error" });
    }
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
