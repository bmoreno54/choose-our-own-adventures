const dotenv = require('dotenv');

// Load environment variables from .env file located in the root of the project
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

/**
 * ACS - setupTests.js
 *
 * This file is responsible for setting up the environment for Jest tests.
 *
 * Environment Variables:
 * - Loads environment variables from the .env file located in the root directory.
 *
 * ACS:
 * - This ACS section provides an overview of the file's purpose,
 *   serving as a guide for developers to understand and extend the setup configuration.
 */
