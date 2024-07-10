const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const storiesRouter = require('./routes/stories');
const agentsRouter = require('./routes/agents');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/stories', storiesRouter);
app.use('/api/agents', agentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb://localhost:27017/choose-our-own-adventures', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
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
 * - dotenv: To load environment variables.
 * - storiesRouter: Routes for story-related operations.
 * - agentsRouter: Routes for agent-related operations.
 *
 * Routes:
 * - '/': A simple route to check if the server is running.
 * - '/api': A test API route to ensure the backend is responding.
 * - '/api/stories': Routes for handling story-related operations.
 * - '/api/agents': Routes for handling agent-related operations.
 *
 * Server Initialization:
 * - The server listens on a specified port, defaulting to 5000.
 * - MongoDB connection is established using Mongoose.
 *
 * Debugging:
 * - Check the server logs for messages indicating the server is running and MongoDB is connected.
 * - If encountering issues, verify that the routes are correctly set up and the MongoDB connection string is accurate.
 */
