const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

/**
 * ACS - Comment.js
 *
 * This file defines the Comment schema for the MongoDB database using Mongoose.
 *
 * Schema:
 * - sentenceId: The ID of the sentence to which the comment is linked (ObjectId, required).
 * - userId: The ID of the user who made the comment (ObjectId, required).
 * - comment: The text of the comment (String, required).
 * - createdAt: The date the comment was created (Date, default: Date.now).
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
