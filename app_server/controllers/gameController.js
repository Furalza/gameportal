const mongoose = require('mongoose');
const Game = require('../models/gameSchema'); // Import Game model

// Render the main page with games (for frontend rendering)
const mainPage = async (req, res) => {
    try {
        const games = await Game.find(); // Fetch games from the database
        console.log("Fetched games:", games);

        res.render('game-list', {
            title: 'Game Portal',
            pageHeader: { title: 'Available Games' },
            games: games,
        });
    } catch (err) {
        console.error("Error fetching games:", err.message);
        res.status(500).send("Error retrieving games.");
    }
};

// Fetch all games as JSON (for API)
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find(); // Fetch games from the database
        res.status(200).json(games); // Send games data as JSON response
    } catch (err) {
        console.error("Error fetching games:", err.message);
        res.status(500).json({ error: 'Error fetching games' });
    }
};

// Add a new game to the database
const addGame = async (req, res) => {
    try {
        const { name, description, image, genres, platform, releaseDate, developer, rating } = req.body;

        // Validate required fields
        if (!name || !description || !image || !genres || !platform || !releaseDate || !developer || rating == null) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create and save the game
        const newGame = new Game({ name, description, image, genres, platform, releaseDate, developer, rating });
        const savedGame = await newGame.save();

        res.status(201).json({ message: 'Game added successfully', game: savedGame });
    } catch (err) {
        console.error("Error adding game:", err.message);
        res.status(500).json({ error: 'Error adding game' });
    }
};

module.exports = {
    mainPage,
    getAllGames,
    addGame, // Export the new function
};
