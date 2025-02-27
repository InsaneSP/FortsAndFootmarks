require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const FortModel = require('./models/forts');
const fortRoutes = require('./routes/fortsRoutes');
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");

app.use(cors({
    origin: "https://forts-and-footmarks.vercel.app",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://forts-and-footmarks.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());


app.use('/forts', fortRoutes);
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

app.post("/fort/:fortName/:commentId/reply", async (req, res) => {
    const fortName = req.params.fortName.toLowerCase();
    const commentId = new mongoose.Types.ObjectId(req.params.commentId);
    const { username, photoURL, comment } = req.body;

    if (!username || !comment) {
        return res.status(400).json({ message: "Username and comment are required" });
    }

    try {
        // Find the fort
        const fort = await FortModel.findOne({ name: new RegExp(fortName, "i") });

        if (!fort) {
            return res.status(404).json({ message: "Fort not found" });
        }

        // Recursive function to find the comment and add the reply
        function addReplyToComment(commentsArray) {
            for (let commentObj of commentsArray) {
                if (commentObj._id.toString() === commentId.toString()) {
                    commentObj.replies.push({ 
                        username, 
                        photoURL, 
                        comment, 
                        createdAt: new Date(), 
                        _id: new mongoose.Types.ObjectId() // Ensure unique ID for each reply
                    });
                    return true;
                }
                if (commentObj.replies.length > 0) {
                    const found = addReplyToComment(commentObj.replies);
                    if (found) return true;
                }
            }
            return false;
        }

        // Call the recursive function to find the correct comment
        const commentFound = addReplyToComment(fort.comments);

        if (!commentFound) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Save the updated fort document
        await fort.save();

        res.status(200).json(fort.comments);
    } catch (error) {
        console.error("Error adding nested reply:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
