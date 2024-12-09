const mongoose = require('mongoose');

// Corrected MongoDB URI
const dbURI = process.env.MONGODB_URI;

// Use native promises
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongoose is connected"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose;

