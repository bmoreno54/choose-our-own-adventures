const mongoose = require('mongoose');
const Story = require('./models/Story');

mongoose.connect('mongodb://localhost:27017/weirdcitysagas', { useNewUrlParser: true, useUnifiedTopology: true });

const testFiltering = async () => {
  try {
    const contributor = 'akabilly';
    const stories = await Story.find({ contributors: contributor });
    console.log(`Filtered stories for contributor ${contributor}:`, stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
  } finally {
    mongoose.disconnect();
  }
};

testFiltering();
