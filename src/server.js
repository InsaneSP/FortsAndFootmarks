const connectDB = require('./db');

// Connect to MongoDB
connectDB();

// Start your server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
