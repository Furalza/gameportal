const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User-related routes
router.get('/login', userController.login); // Render login page
router.post('/login', userController.loginUser); // Handle login submission
router.get('/register', userController.register); // Render registration page
router.post('/register', userController.registerUser); // Handle registration submission

module.exports = router;
