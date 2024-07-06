// server/src/index.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const storiesRouter = require('./routes/stories');

// Initialize the app and define the port
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define a simple route
// ACS: This route is used to check if the server is running properly.
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define an API route
// ACS: This route is used to test if the API endpoint is working.
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Use routes
// ACS: This middleware integrates the stories routes into the application under the /api/stories path.
app.use('/api/stories', storiesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // ACS: Log to confirm the server is running and listening on the specified port.
});

// Connect to MongoDB
// ACS: Connect to the MongoDB database using Mongoose.
mongoose.connect('mongodb://localhost:27017/choose-our-own-adventures', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // ACS: Log any connection errors for debugging.
  });

/**
 * ACS - index.js
 *
 * This file sets up the Express server, connects to MongoDB, and defines routes.
 *
 * Imports:
 * - express: The core framework for building the server.
 * - mongoose: Used to interact with MongoDB.
 * - cors: Middleware for enabling Cross-Origin Resource Sharing.
 * - bodyParser: Middleware to parse incoming request bodies.
 *
 * Routes:
 * - '/': A simple route to check if the server is running.
 * - '/api': A test API route to ensure the backend is responding.
 * - '/api/stories': Routes for handling story-related operations.
 *
 * Server Initialization:
 * - The server listens on a specified port, defaulting to 5000.
 * - MongoDB connection is established using Mongoose.
 *
 * Debugging:
 * - Check the server logs for messages indicating the server is running and MongoDB is connected.
 * - If encountering issues, verify that the routes are correctly set up and the MongoDB connection string is accurate.
 */
