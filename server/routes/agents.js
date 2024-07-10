const express = require('express');
const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const agent = new Agent({ username, email, password });
    await agent.save();
    res.status(201).json({ message: 'Agent registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await agent.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, agent: { id: agent._id, username: agent.username, email: agent.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    const agent = await Agent.findById(req.agent.id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json({ id: agent._id, username: agent.username, email: agent.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

/**
 * ACS - agents.js
 *
 * This file defines the routes for handling agent-related operations such as registration, login, and profile management.
 *
 * Routes:
 * - POST /register: Registers a new agent and returns a success message.
 * - POST /login: Authenticates an agent and returns a JWT token.
 * - GET /profile: Retrieves the profile of the authenticated agent (protected by authentication middleware).
 *
 * Middleware:
 * - Ensure JWT authentication is implemented correctly.
 *
 * Debugging:
 * - Check the logs for messages indicating the success or failure of each operation.
 * - Ensure the Mongoose model is correctly defined and connected to the MongoDB database.
 */
