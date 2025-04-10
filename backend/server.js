require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const FortModel = require('./models/forts');
const fortRoutes = require('./routes/fortsRoutes');
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentsRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
// app.use(cors({
//     origin: "https://forts-and-footmarks.vercel.app",
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization"
// }));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://forts-and-footmarks.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(express.json());

app.use('/forts', fortRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

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
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
