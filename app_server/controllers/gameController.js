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

module.exports = {
    mainPage,
    getAllGames, // Export the new function
};
