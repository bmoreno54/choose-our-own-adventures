const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Story = require('../models/Story');
const Sentence = require('../models/Sentence');
const Comment = require('../models/Comment');
const Emoji = require('../models/Emoji');
const Branch = require('../models/Branch');
const storiesRouter = require('../routes/stories');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/stories', storiesRouter);

// Connect to a test database
beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/test_database`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear test database after each test
afterEach(async () => {
  await Story.deleteMany();
  await Sentence.deleteMany();
  await Comment.deleteMany();
  await Emoji.deleteMany();
  await Branch.deleteMany();
});

// Disconnect from test database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Stories API', () => {
  let token;
  let userId;

  beforeAll(() => {
    // Create a valid ObjectId for tests
    userId = new mongoose.Types.ObjectId();
    // Create a token for tests
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should create a new story', async () => {
    const response = await request(app)
      .post('/api/stories')
      .send({ content: 'Once upon a time', author: 'test_author' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.firstSentence.content).toBe('Once upon a time');
    expect(response.body.firstSentence.author).toBe('test_author');
  });

  it('should get all stories', async () => {
    const firstSentence = new Sentence({ content: 'Sample story', author: 'test_author' });
    await firstSentence.save();
    const story = new Story({ firstSentence: firstSentence._id, contributors: ['test_author'] });
    await story.save();

    const response = await request(app).get('/api/stories');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].firstSentence.content).toBe('Sample story');
  });

  it('should delete a story if user is the sole contributor', async () => {
    const firstSentence = new Sentence({ content: 'Sample story', author: 'test_author' });
    await firstSentence.save();
    const story = new Story({ firstSentence: firstSentence._id, contributors: ['test_author'] });
    await story.save();

    const response = await request(app)
      .delete(`/api/stories/${story._id}`)
      .send({ user: 'test_author' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Story deleted');
  });

  it('should remove authorship link if there are multiple contributors', async () => {
    const firstSentence = new Sentence({ content: 'Sample story', author: 'test_author' });
    await firstSentence.save();
    const story = new Story({ firstSentence: firstSentence._id, contributors: ['test_author', 'another_author'] });
    await story.save();

    const response = await request(app)
      .delete(`/api/stories/${story._id}`)
      .send({ user: 'test_author' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Authorship link removed');
    expect(response.body.story.contributors.includes('test_author')).toBe(false);
  });

  it('should add a comment to a sentence', async () => {
    const firstSentence = new Sentence({ content: 'Sample story', author: 'test_author' });
    await firstSentence.save();
    const story = new Story({ firstSentence: firstSentence._id, contributors: ['test_author'] });
    await story.save();

    const response = await request(app)
      .post(`/api/stories/${story._id}/sentences/${firstSentence._id}/comments`)
      .send({ userId: userId, comment: 'Great sentence!' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.comments.length).toBe(1);
    expect(response.body.comments[0].comment).toBe('Great sentence!');
  });

  it('should add an emoji to a sentence', async () => {
    const firstSentence = new Sentence({ content: 'Sample story', author: 'test_author' });
    await firstSentence.save();
    const story = new Story({ firstSentence: firstSentence._id, contributors: ['test_author'] });
    await story.save();

    const response = await request(app)
      .post(`/api/stories/${story._id}/sentences/${firstSentence._id}/emojis`)
      .send({ userId: userId, emoji: '👍' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.emojis.length).toBe(1);
    expect(response.body.emojis[0].emoji).toBe('👍');
  });

  it('should add a branch to a sentence', async () => {
    const firstSentence = new Sentence({ content: 'Sample story', author: 'test_author' });
    await firstSentence.save();
    const story = new Story({ firstSentence: firstSentence._id, contributors: ['test_author'] });
    await story.save();

    const response = await request(app)
      .post(`/api/stories/${story._id}/sentences/${firstSentence._id}/branches`)
      .send({ nextSentences: [new mongoose.Types.ObjectId()] })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.branches.length).toBe(1);
    expect(response.body.branches[0].nextSentences.length).toBe(1);
  });
});

/**
 * ACS - stories.test.js
 *
 * This file contains tests for the Stories API, ensuring CRUD operations and new functionalities work as expected.
 *
 * Tests:
 * - Creating a new story
 * - Retrieving all stories
 * - Deleting a story (both sole contributor and multiple contributors scenarios)
 * - Adding a comment to a sentence
 * - Adding an emoji to a sentence
 * - Adding a branch to a sentence
 *
 * Environment Variables:
 * - Ensure JWT_SECRET and TEST_TOKEN are correctly set in the .env file.
 *
 * Debugging:
 * - Console logs are added to track responses and assist in debugging.
 *
 * ACS:
 * - Documenting the purpose, logic, and structure of tests for future reference and maintenance.
 */
