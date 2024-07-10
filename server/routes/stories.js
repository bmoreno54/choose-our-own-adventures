const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const authenticate = require('../middleware/auth');

// Create a new story
router.post('/', async (req, res) => {
  try {
    console.log('Received story data:', req.body);
    const story = new Story({
      content: req.body.content || '',
      author: req.body.author || 'unnamed'
    });
    await story.save();
    console.log('Story created:', story);
    res.status(201).json(story);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(400).json({ error: error.message });
  }
});

// Fetch stories with optional query parameters
router.get('/', async (req, res) => {
  try {
    let filter = {};
    console.log('Received query parameters:', req.query); // Debugging line

    if (req.query.contributor) {
      filter.contributors = req.query.contributor;
      console.log(`Filtering stories by contributor: ${req.query.contributor}`); // Debugging line
    } else if (req.query.ids) {
      filter._id = { $in: req.query.ids.split(',') };
      console.log(`Filtering stories by IDs: ${req.query.ids}`); // Debugging line
    }

    if (req.query.excludeContributors) {
      filter.contributors = filter.contributors || {};
      filter.contributors.$nin = req.query.excludeContributors.split(',');
      console.log(`Excluding stories by contributors: ${req.query.excludeContributors}`); // Debugging line
    }

    console.log('Constructed filter:', filter); // Debugging line

    const stories = await Story.find(filter);
    console.log('Filtered stories:', stories); // Debugging line
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a story
router.put('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a story
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const user = req.body.user; // The user requesting the deletion
    if (story.contributors.length > 1) {
      // If there are multiple contributors, remove the user's authorship link
      console.log(`Removing user ${user} from contributors: `, story.contributors);
      story.contributors = story.contributors.filter(contributor => contributor !== user);
      console.log(`Updated contributors: `, story.contributors);

      const updatedStory = await Story.findByIdAndUpdate(
        req.params.id,
        { $set: { contributors: story.contributors } },
        { new: true }
      );
      if (!updatedStory) {
        throw new Error('Failed to update contributors');
      }

      console.log('Updated story from DB:', updatedStory);
      res.json({ message: 'Authorship link removed', story: updatedStory });
    } else {
      // If the user is the sole contributor, delete the story
      await story.deleteOne(); // Updated to use deleteOne instead of remove
      res.json({ message: 'Story deleted' });
    }
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ error: error.message });
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
 * - 'GET /': Retrieves stories from the database based on query parameters (contributor or story IDs).
 * - 'GET /:id': Retrieves a story by its ID from the database.
 * - 'PUT /:id': Updates a story by its ID with the details provided in the request body.
 * - 'DELETE /:id': Deletes a story by its ID from the database. If the story has multiple contributors, it removes the requesting user's authorship link instead of deleting the story.
 *
 * Debugging:
 * - Check the logs for messages indicating the success or failure of each operation.
 * - Ensure the Mongoose model is correctly defined and connected to the MongoDB database.
 */