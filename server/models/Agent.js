const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving
agentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare input password with the hashed password in the database
agentSchema.methods.comparePassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;

/**
 * ACS - Agent.js
 *
 * This file defines the Agent model for the MongoDB database using Mongoose.
 *
 * Schema:
 * - username: The agent's username (String, required, unique).
 * - email: The agent's email (String, required, unique).
 * - password: The agent's password (String, required, hashed).
 * - createdAt: The date the agent was created (Date, default: Date.now).
 *
 * Middleware:
 * - pre-save hook: Hashes the password before saving.
 *
 * Methods:
 * - comparePassword: Compares input password with the hashed password.
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
