// client/src/components/ContinueStory.js

import React, { useEffect, useState } from 'react';

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

  return (
    <div className="continue-story-container">
      <h2>Continue a Story</h2>
      <button onClick={onBack}>Back to Main Menu</button>
      <ul>
        {stories.map(story => (
          <li key={story._id}>
            <h3>{story.title}</h3>
            <button onClick={() => onSelectStory(story._id)}>Continue</button>
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
 * This component allows users to continue an existing story by selecting it and adding more content.
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
 * - onSelectStory: Calls the parent function to handle the selected story for interaction.
 *
 * Debugging:
 * - Console logs to track the fetched stories and method calls.
 *
 * Rendering:
 * - Renders a list of stories with options to continue them.
 * - Renders a button to navigate back to the main menu.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */