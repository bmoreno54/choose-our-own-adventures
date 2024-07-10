const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const agentsRouter = require('../routes/agents');

const app = express();
app.use(express.json());
app.use('/api/agents', agentsRouter);

// Connect to a test database
beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/test_database`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear test database after each test
afterEach(async () => {
  await Agent.deleteMany();
});

// Disconnect from test database after all tests
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

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.username).toBe('testagent');
  });
});

/**
 * ACS - agents.test.js
 *
 * This file contains automated tests for agent-related operations using Jest and Supertest.
 *
 * Tests:
 * - Register a new agent: Ensures an agent can be registered successfully.
 * - Login an agent: Ensures an agent can log in and receive a JWT token.
 * - Get agent profile: Ensures the authenticated agent can retrieve their profile.
 *
 * Database:
 * - Connects to a test MongoDB database before running tests.
 * - Clears the test database after each test.
 * - Disconnects from the test database after all tests.
 *
 * ACS:
 * - This ACS section provides an overview of the test cases and their purpose,
 *   serving as a guide for developers to understand and extend the tests.
 */
