const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment');
const Emoji = require('./Emoji');
const Branch = require('./Branch');

const sentenceSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [String],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  emojis: [{ type: Schema.Types.ObjectId, ref: 'Emoji' }],
  branches: [Branch.schema],
  previousSentence: {
    type: Schema.Types.ObjectId,
    ref: 'Sentence'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;

/**
 * ACS - Sentence.js
 *
 * This file defines the Sentence model for the MongoDB database using Mongoose.
 *
 * Schema:
 * - content: The content of the sentence (String, required).
 * - author: The author of the sentence (String, required).
 * - tags: An array of tags associated with the sentence (String array).
 * - comments: An array of comment IDs (ObjectId, ref: 'Comment').
 * - emojis: An array of emoji IDs (ObjectId, ref: 'Emoji').
 * - branches: An array of branch sub-documents (Branch array).
 * - previousSentence: The ID of the previous sentence (ObjectId, ref: 'Sentence').
 * - createdAt: The date the sentence was created (Date, default: Date.now).
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
