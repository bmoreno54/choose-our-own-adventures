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
  contributors: {
    type: [String], // Array of contributor usernames
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Adding a pre-save hook to ensure the author is added to the contributors list
storySchema.pre('save', function (next) {
  if (!this.contributors.includes(this.author)) {
    this.contributors.push(this.author);
  }
  next();
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
 * - contributors: An array of contributors (String array, default: []).
 * - createdAt: The date the story was created (Date, default: Date.now).
 *
 * Model:
 * - Story: The Mongoose model for the story schema.
 *
 * Middleware:
 * - pre-save hook: Ensures the author is added to the contributors list.
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
