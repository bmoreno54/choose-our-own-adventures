// server/src/routes/stories.js

const express = require('express');
const Story = require('../models/Story');
const router = express.Router();

// Create a new story
// ACS: This route handles the creation of a new story. It receives the story details in the request body, creates a new Story instance, saves it to the database, and returns the saved story.
router.post('/', async (req, res) => {
  try {
    console.log('Received story data:', req.body);
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(400).json({ error: error.message });
    // ACS: Log any errors that occur during the story creation process.
  }
});

// Get all stories
// ACS: This route retrieves all stories from the database and returns them in the response.
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
    // ACS: Log any errors that occur during the retrieval of all stories.
  }
});

// Get a story by ID
// ACS: This route retrieves a story by its ID from the database and returns it in the response. If the story is not found, it returns a 404 error.
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
    // ACS: Log any errors that occur during the retrieval of the story by ID.
  }
});

// Update a story
// ACS: This route updates a story by its ID with the details provided in the request body. It returns the updated story in the response. If the story is not found, it returns a 404 error.
router.put('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
    // ACS: Log any errors that occur during the update of the story.
  }
});

// Delete a story
// ACS: This route deletes a story by its ID from the database. It returns a confirmation message in the response. If the story is not found, it returns a 404 error.
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // ACS: Log any errors that occur during the deletion of the story.
  }
});

module.exports = router;

/**
 * ACS - stories.js
 *
 * This file defines the routes for handling story-related operations. It includes routes for creating, retrieving, updating, and deleting stories.
 *
 * Imports:
 * - express: The core framework for building the server.
 * - Story: The Mongoose model for the story.
 *
 * Routes:
 * - 'POST /': Creates a new story and returns the saved story.
 * - 'GET /': Retrieves all stories from the database.
 * - 'GET /:id': Retrieves a story by its ID from the database.
 * - 'PUT /:id': Updates a story by its ID with the details provided in the request body.
 * - 'DELETE /:id': Deletes a story by its ID from the database.
 *
 * Debugging:
 * - Check the logs for messages indicating the success or failure of each operation.
 * - Ensure the Mongoose model is correctly defined and connected to the MongoDB database.
 */
module.exports = router;

/**
 * ACS - stories.js
 *
 * This file defines the routes for handling story-related operations. It includes routes for creating, retrieving, updating, and deleting stories.
 *
 * Imports:
 * - express: The core framework for building the server.
 * - Story: The Mongoose model for the story.
 *
 * Routes:
 * - 'POST /': Creates a new story and returns the saved story.
 * - 'GET /': Retrieves all stories from the database.
 * - 'GET /:id': Retrieves a story by its ID from the database.
 * - 'PUT /:id': Updates a story by its ID with the details provided in the request body.
 * - 'DELETE /:id': Deletes a story by its ID from the database.
 *
 * Debugging:
 * - Check the logs for messages indicating the success or failure of each operation.
 * - Ensure the Mongoose model is correctly defined and connected to the MongoDB database.
 */