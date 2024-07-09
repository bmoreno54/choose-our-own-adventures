const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Story = require('../models/Story');
const storiesRouter = require('../routes/stories');

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
});

// Disconnect from test database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Stories API', () => {
  it('should create a new story', async () => {
    const response = await request(app)
      .post('/api/stories')
      .send({ content: 'Once upon a time', author: 'test_author' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.content).toBe('Once upon a time');
    expect(response.body.author).toBe('test_author');
  });

  it('should get all stories', async () => {
    const story = new Story({ content: 'Sample story', author: 'test_author' });
    await story.save();

    const response = await request(app).get('/api/stories');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe('Sample story');
  });

  it('should delete a story if user is the sole contributor', async () => {
    const story = new Story({ content: 'Sample story', author: 'test_author', contributors: ['test_author'] });
    await story.save();

    const response = await request(app)
      .delete(`/api/stories/${story._id}`)
      .send({ user: 'test_author' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Story deleted');
  });

  it('should remove authorship link if there are multiple contributors', async () => {
    const story = new Story({ content: 'Sample story', author: 'test_author', contributors: ['test_author', 'another_author'] });
    await story.save();

    const response = await request(app)
      .delete(`/api/stories/${story._id}`)
      .send({ user: 'test_author' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Authorship link removed');
    expect(response.body.story.contributors.includes('test_author')).toBe(false);
  });
});
