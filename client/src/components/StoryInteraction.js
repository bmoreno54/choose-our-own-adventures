// client/src/components/StoryInteraction.js

import React, { useEffect, useState } from 'react';

function StoryInteraction({ storyId, onBack }) {
  const [story, setStory] = useState(null);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetch(`/api/stories/${storyId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Story fetched:', data);
        setStory(data);
      })
      .catch(error => console.error('Error fetching story:', error));
  }, [storyId]);

  const handleUpdate = async () => {
    if (!story) return;

    try {
      const updatedStory = { ...story, content: story.content + '\n' + newContent };
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStory),
      });
      const data = await response.json();
      console.log('Story updated:', data);
      setStory(data);
      setNewContent('');
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  return (
    <div className="story-interaction-container">
      <h2>{story?.title}</h2>
      <p>{story?.content}</p>
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="Add your content here..."
      ></textarea>
      <button onClick={handleUpdate}>Submit</button>
      <button onClick={onBack}>Back to Main Menu</button>
    </div>
  );
}

export default StoryInteraction;

/**
 * ACS - StoryInteraction.js
 *
 * This component handles the main interaction loop for a story, including displaying the story content, appending new content, and navigating back to the main menu.
 *
 * Props:
 * - storyId: The ID of the story to interact with.
 * - onBack: A function to navigate back to the main menu.
 *
 * State:
 * - story: The story object fetched from the backend.
 * - newContent: Holds the new content added by the user.
 *
 * useEffect:
 * - Fetches the story by its ID from the /api/stories/:id endpoint and sets the story state.
 *
 * Handlers:
 * - handleUpdate: Appends new content to the story and sends a PUT request to update the story.
 *
 * Debugging:
 * - Console logs to track the fetched story and method calls.
 *
 * Rendering:
 * - Renders the story title and content.
 * - Renders a form to add new content to the story.
 * - Renders buttons to submit the new content and to navigate back to the main menu.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */
