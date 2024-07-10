const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  firstSentence: {
    type: Schema.Types.ObjectId,
    ref: 'Sentence',
    required: true
  },
  contributors: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Adding a pre-save hook to ensure the firstSentence author is added to the contributors list
storySchema.pre('save', async function (next) {
  const firstSentence = await this.model('Sentence').findById(this.firstSentence);
  if (firstSentence && !this.contributors.includes(firstSentence.author)) {
    this.contributors.push(firstSentence.author);
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
 * - firstSentence: The ID of the first sentence in the story (ObjectId, ref: 'Sentence', required).
 * - contributors: A list of usernames of contributors to the story (String array, default: []).
 * - createdAt: The date the story was created (Date, default: Date.now).
 *
 * Middleware:
 * - pre-save hook: Ensures the firstSentence author is added to the contributors list.
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
