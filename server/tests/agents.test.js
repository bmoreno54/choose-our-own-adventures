const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const agentsRouter = require('../routes/agents');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/agents', agentsRouter);

beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/test_database`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Agent.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Agent API', () => {
  it('should register a new agent', async () => {
    const response = await request(app)
      .post('/api/agents/register')
      .send({ username: 'testagent', email: 'test@example.com', password: 'password' });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Agent registered successfully');
  });

  it('should login an agent', async () => {
    const agent = new Agent({ username: 'testagent', email: 'test@example.com', password: 'password' });
    await agent.save();

    const response = await request(app)
      .post('/api/agents/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.agent.username).toBe('testagent');
  });

  it('should get agent profile', async () => {
    const agent = new Agent({ username: 'testagent', email: 'test@example.com', password: 'password' });
    await agent.save();

    const loginResponse = await request(app)
      .post('/api/agents/login')
      .send({ email: 'test@example.com', password: 'password' });

    const token = loginResponse.body.token;

    const profileResponse = await request(app)
      .get('/api/agents/profile')
      .set('Authorization', `Bearer ${token}`);

    console.log('Profile response:', profileResponse.body); // Log the profile response
    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.username).toBe('testagent');
  });
});

/**
 * ACS - agents.test.js
 *
 * This file contains tests for the Agent API, ensuring authentication operations work as expected.
 *
 * Tests:
 * - Logging in an agent
 * - Retrieving an agent profile
 *
 * Environment Variables:
 * - Ensure JWT_SECRET is correctly set in the .env file.
 *
 * Debugging:
 * - Console logs are added to track responses and assist in debugging.
 *
 * ACS:
 * - Documenting the purpose, logic, and structure of tests for future reference and maintenance.
 */
