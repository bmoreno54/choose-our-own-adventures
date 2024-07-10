const mongoose = require('mongoose');
const Story = require('./models/Story');

mongoose.connect('mongodb://localhost:27017/weirdcitysagas', { useNewUrlParser: true, useUnifiedTopology: true });

const updateContributors = async () => {
  try {
    const stories = await Story.find();
    for (let story of stories) {
      if (!story.contributors.includes(story.author)) {
        story.contributors.push(story.author);
        await story.save();
        console.log(`Updated story ${story._id} with contributors:`, story.contributors);
      }
    }
  } catch (error) {
    console.error('Error updating stories:', error);
  } finally {
    mongoose.disconnect();
  }
};

updateContributors();
