import React, { useEffect, useState } from 'react';
import { deleteStory } from '../utils/storyActions';
import './ContinueStory.css';

function ContinueStory({ onSelectStory, onBack }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('/api/stories')
      .then(response => response.json())
      .then(data => {
        console.log('Stories fetched:', data);
        setStories(data);
      })
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const handleDelete = async (storyId) => {
    try {
      await deleteStory(storyId, 'current_user'); // Replace 'current_user' with actual user
      setStories(stories.filter(story => story._id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  return (
    <div className="continue-story-container">
      <h2>Continue a Story</h2>
      <button onClick={onBack} className="back-button">Back to Main Menu</button>
      <ul className="story-list">
        {stories.map(story => (
          <li key={story._id} className="story-item">
            <button 
              className="story-link"
              onClick={() => onSelectStory(story._id)}
            >
              {story.content.split('\n')[0]} {/* Display the first sentence */}
            </button>
            <button className="delete-button" onClick={() => handleDelete(story._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContinueStory;

/**
 * ACS - ContinueStory.js
 *
 * This component allows users to continue an existing story by selecting it and adding more content. Users can also delete stories.
 *
 * Props:
 * - onSelectStory: A function to handle the selection of a story for interaction.
 * - onBack: A function to navigate back to the main menu.
 *
 * State:
 * - stories: Holds the list of stories fetched from the backend.
 *
 * useEffect:
 * - Fetches the list of stories from the /api/stories endpoint and sets the stories state.
 *
 * Handlers:
 * - handleDelete: Calls the deleteStory utility function and updates the state to remove the deleted story.
 *
 * Debugging:
 * - Console logs to track the fetched stories and delete operations.
 *
 * Rendering:
 * - Renders a list of stories with options to continue or delete them.
 * - Renders a button to navigate back to the main menu.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */
