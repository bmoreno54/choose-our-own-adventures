const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is defined
const router = express.Router();
const Story = require('../models/Story');
const Sentence = require('../models/Sentence');
const Comment = require('../models/Comment');
const Emoji = require('../models/Emoji');
const authenticate = require('../middleware/auth');

// Create a new story
router.post('/', async (req, res) => {
  try {
    console.log('Received story data:', req.body);
    const firstSentence = new Sentence({
      content: req.body.content || '',
      author: req.body.author || 'unnamed'
    });
    await firstSentence.save();
    const story = new Story({
      firstSentence: firstSentence._id,
      contributors: [req.body.author || 'unnamed']
    });
    await story.save();
    const populatedStory = await Story.findById(story._id).populate('firstSentence').exec();
    console.log('Story created:', populatedStory);
    res.status(201).json(populatedStory);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(400).json({ error: error.message });
  }
});

// Fetch stories with optional query parameters
router.get('/', async (req, res) => {
  try {
    let filter = {};

    if (req.query.contributor) {
      filter.contributors = req.query.contributor;
    } else if (req.query.ids) {
      filter._id = { $in: req.query.ids.split(',') };
    }

    if (req.query.excludeContributors) {
      filter.contributors = filter.contributors || {};
      filter.contributors.$nin = req.query.excludeContributors.split(',');
    }

    const stories = await Story.find(filter).populate('firstSentence');
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('firstSentence');
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
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('firstSentence');
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

    const user = req.body.user;
    if (story.contributors.length > 1) {
      story.contributors = story.contributors.filter(contributor => contributor !== user);

      const updatedStory = await Story.findByIdAndUpdate(
        req.params.id,
        { $set: { contributors: story.contributors } },
        { new: true }
      ).populate('firstSentence');

      res.json({ message: 'Authorship link removed', story: updatedStory });
    } else {
      await story.deleteOne();
      res.json({ message: 'Story deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Comment to a Sentence
router.post('/:storyId/sentences/:sentenceId/comments', authenticate, async (req, res) => {
  try {
    // Ensure the ObjectId is created properly
    const newComment = new Comment({
      sentenceId: req.params.sentenceId,
      userId: req.agent.id,
      comment: req.body.comment,
      createdAt: new Date()
    });
    await newComment.save();
    const sentence = await Sentence.findByIdAndUpdate(
      req.params.sentenceId,
      { $push: { comments: newComment._id } },
      { new: true, runValidators: true }
    ).populate('comments');
    console.log('Updated sentence with comment:', sentence); // Log the updated sentence
    res.json(sentence);
  } catch (error) {
    console.error('Error adding comment:', error); // Log the error
    res.status(400).json({ error: error.message });
  }
});

// Add Emoji to a Sentence
router.post('/:storyId/sentences/:sentenceId/emojis', authenticate, async (req, res) => {
  try {
    // Ensure the ObjectId is created properly
    const newEmoji = new Emoji({
      sentenceId: req.params.sentenceId,
      userId: req.agent.id,
      emoji: req.body.emoji,
      createdAt: new Date()
    });
    await newEmoji.save();
    const sentence = await Sentence.findByIdAndUpdate(
      req.params.sentenceId,
      { $push: { emojis: newEmoji._id } },
      { new: true, runValidators: true }
    ).populate('emojis');
    console.log('Updated sentence with emoji:', sentence); // Log the updated sentence
    res.json(sentence);
  } catch (error) {
    console.error('Error adding emoji:', error); // Log the error
    res.status(400).json({ error: error.message });
  }
});

// Add Branch to a Sentence
router.post('/:storyId/sentences/:sentenceId/branches', authenticate, async (req, res) => {
  try {
    const { nextSentences } = req.body;
    const newBranch = {
      sentenceId: req.params.sentenceId,
      nextSentences
    };
    const sentence = await Sentence.findByIdAndUpdate(
      req.params.sentenceId,
      { $push: { branches: newBranch } },
      { new: true, runValidators: true }
    );
    res.json(sentence);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

/**
 * ACS - stories.js
 *
 * This file defines the routes for handling story-related operations. It includes routes for creating, retrieving, updating, and deleting stories.
 * It also includes routes for adding comments, emojis, and branching paths to sentences within stories.
 *
 * Imports:
 * - express: The core framework for building the server.
 * - mongoose: ORM for MongoDB.
 * - Story: The Mongoose model for the story.
 * - Sentence: The Mongoose model for the sentence.
 * - Comment: The Mongoose model for the comment.
 * - Emoji: The Mongoose model for the emoji.
 * - authenticate: Middleware for JWT authentication.
 *
 * Routes:
 * - 'POST /': Creates a new story and returns the saved story.
 * - 'GET /': Retrieves stories from the database based on query parameters (contributor or story IDs).
 * - 'GET /:id': Retrieves a story by its ID from the database.
 * - 'PUT /:id': Updates a story by its ID with the details provided in the request body.
 * - 'DELETE /:id': Deletes a story by its ID from the database. If the story has multiple contributors, it removes the requesting user's authorship link instead of deleting the story.
 * - 'POST /:storyId/sentences/:sentenceId/comments': Adds a comment to a specific sentence in a story.
 * - 'POST /:storyId/sentences/:sentenceId/emojis': Adds an emoji to a specific sentence in a story.
 * - 'POST /:storyId/sentences/:sentenceId/branches': Adds a branching path to a specific sentence in a story.
 *
 * Middleware:
 * - authenticate: Ensures that the request is authenticated using JWT.
 *
 * Debugging:
 * - Check the logs for messages indicating the success or failure of each operation.
 * - Ensure the Mongoose model is correctly defined and connected to the MongoDB database.
 * - Verify that the request body contains the necessary data for each operation.
 */
