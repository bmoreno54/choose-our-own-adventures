const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;

/**
 * ACS - Story.js
 *
 * This file defines the Story model for the MongoDB database using Mongoose.
 *
 * Schema:
 * - content: The content of the story (String, required).
 * - author: The author of the story (String, required).
 * - createdAt: The date the story was created (Date, default: Date.now).
 *
 * Model:
 * - Story: The Mongoose model for the story schema.
 *
 * Comments:
 * - Detailed comments are provided to explain each part of the schema and model.
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
