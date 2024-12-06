// backend/server.js
require('dotenv').config(); // Add this at the top of the file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fortRoutes = require('./routes/fortsRoutes');  // Import the routes

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Use the forts routes
app.use('/forts', fortRoutes);

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
