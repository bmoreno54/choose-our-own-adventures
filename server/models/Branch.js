const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  sentenceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Sentence'
  },
  nextSentences: [{
    type: Schema.Types.ObjectId,
    ref: 'Sentence'
  }]
}, { _id: false });

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;

/**
 * ACS - Branch.js
 *
 * This file defines the Branch sub-schema for the MongoDB database using Mongoose.
 *
 * Schema:
 * - sentenceId: The ID of the sentence from which the branch starts (ObjectId, required).
 * - nextSentences: An array of IDs of the next sentences (ObjectId array).
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
