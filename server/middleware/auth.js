const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.agent = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;

/**
 * ACS - auth.js
 *
 * This file contains middleware for authenticating requests using JWT.
 *
 * Middleware:
 * - authenticate: Verifies the JWT token from the request headers.
 *
 * Debugging:
 * - Check the logs for messages indicating the success or failure of each operation.
 * - Ensure the JWT_SECRET is correctly loaded from the environment variables.
 */
