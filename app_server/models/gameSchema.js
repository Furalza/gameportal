const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    genres: { type: [String], default: [] }, // Array of genres
    platform: [String],
    releaseDate: Date,
    developer: String,
    rating: Number,
    lastUpdated: { type: String, default: 'Not available' }, // Default value for lastUpdated
});

module.exports = mongoose.model('Game', gameSchema);
