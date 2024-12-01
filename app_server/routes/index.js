const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const aboutController = require('../controllers/aboutController');

// User-related routes
router.get('/login', userController.login); // Render login form
router.post('/login', userController.loginUser); // Handle login submission
router.get('/register', userController.register); // Render registration form
router.post('/register', userController.registerUser); // Handle registration submission

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Error logging out.");
        }
        res.redirect('/login'); // Redirect to the login page after logout
    });
});

// Game-related routes
router.get('/games', gameController.mainPage); // Render the main games page
router.get('/api/games', gameController.getAllGames); // API to fetch all games (new)

// About page route
router.get('/about', aboutController.about); // Render the About page

// Redirect root to the games page
router.get('/', (req, res) => {
    res.redirect('/games'); // Default page is the games page
});

module.exports = router;
