const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emojiSchema = new Schema({
  sentenceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Sentence'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  },
  emoji: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Emoji = mongoose.model('Emoji', emojiSchema);

module.exports = Emoji;

/**
 * ACS - Emoji.js
 *
 * This file defines the Emoji schema for the MongoDB database using Mongoose.
 *
 * Schema:
 * - sentenceId: The ID of the sentence to which the emoji is linked (ObjectId, required).
 * - userId: The ID of the user who added the emoji (ObjectId, required).
 * - emoji: The emoji character (String, required).
 * - createdAt: The date the emoji was added (Date, default: Date.now).
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
