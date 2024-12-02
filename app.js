const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./app_server/models/db'); // Ensure the database connection is loaded
const indexRouter = require('./app_server/routes/index');

const app = express();

// Load SSL certificates
const privateKey = fs.readFileSync(path.join(__dirname, 'sslcert/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'sslcert/cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(
  session({
    secret: 'yourSecretKey', // Replace with a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true for HTTPS
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport.js
const User = require('./app_server/models/userSchema'); // Ensure correct path
passport.use(User.createStrategy()); // Passport-local-mongoose adds this
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to expose session data to views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start HTTPS server
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on https://localhost');
});

// Optional: Redirect HTTP to HTTPS
const http = require('http');
http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  })
  .listen(80);

module.exports = app;
