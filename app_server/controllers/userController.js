const passport = require('passport'); // Import Passport
const User = require('../models/userSchema'); // Import the User model

// Render the registration page
const register = (req, res) => {
    res.render('register-form', { title: 'Register', error: null });
};

// Render the login page
const login = (req, res) => {
    res.render('login-form', { title: 'Sign In', error: null });
};

// Handle user registration
const registerUser = async (req, res) => {
    const { username, name, email, password } = req.body;

    try {
        if (!username || !name || !email || !password) {
            return res.render('register-form', {
                title: 'Register',
                error: 'All fields are required.',
            });
        }

        // Register the user using Passport.js
        const user = await User.register(
            new User({ username, name, email }),
            password
        );

        console.log('User registered successfully:', user);
        res.redirect('/login'); // Redirect to login page after successful registration
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.render('register-form', {
            title: 'Register',
            error: err.code === 11000 ? 'Username or Email already in use.' : 'An error occurred. Please try again.',
        });
    }
};

// Handle user login
const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during login:', err);
            return res.render('login-form', { title: 'Sign In', error: 'An error occurred. Please try again.' });
        }
        if (!user) {
            return res.render('login-form', { title: 'Sign In', error: info.message || 'Invalid credentials.' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error during login:', err);
                return res.render('login-form', { title: 'Sign In', error: 'An error occurred. Please try again.' });
            }
            req.session.username = user.username; // Store username in the session
            res.redirect('/games'); // Redirect to games page on successful login
        });
    })(req, res, next);
};

// Handle user logout
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out.');
        }
        res.redirect('/login'); // Redirect to the login page on successful logout
    });
};

module.exports = {
    register,
    login,
    registerUser,
    loginUser,
    logout,
};
