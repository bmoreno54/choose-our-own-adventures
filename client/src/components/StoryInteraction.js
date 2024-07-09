import React, { useEffect, useState, useRef } from 'react';
import SentenceInput from './SentenceInput'; // Import the SentenceInput component
import { deleteStory } from '../utils/storyActions'; // Import the deleteStory utility function
import { isValidSentence } from '../utils/validation'; // Import the validation function

function StoryInteraction({ storyId, onBack }) {
  const [story, setStory] = useState(null);
  const [newContent, setNewContent] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (storyId) {
      fetch(`/api/stories/${storyId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Story fetched:', data);
          setStory(data);
        })
        .catch(error => console.error('Error fetching story:', error));
    }
  }, [storyId]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleUpdate = async () => {
    if (!story || !isValidSentence(newContent)) return;

    console.log('Updating story with new content:', newContent);

    try {
      const updatedStory = { ...story, content: story.content.trim() + '\n' + newContent.trim() };
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

  const handleDelete = async () => {
    try {
      await deleteStory(storyId, 'current_user'); // Replace 'current_user' with actual user
      onBack(); // Navigate back after deletion
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  return (
    <div className="story-interaction-container">
      <h2>Story Interaction</h2>
      <p>{story?.content}</p>
      <SentenceInput value={newContent} onChange={setNewContent} onSubmit={handleUpdate} ref={inputRef} />
      <button onClick={onBack}>Back to Main Menu</button>
      <button onClick={handleDelete} className="delete-button">Delete Story</button>
    </div>
  );
}

export default StoryInteraction;

/**
 * ACS - StoryInteraction.js
 *
 * This component handles the main interaction loop for a story, including displaying the story content, appending new content, deleting the story, and navigating back to the main menu.
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
 * - Focuses the SentenceInput when the component is mounted.
 *
 * Handlers:
 * - handleUpdate: Appends new content to the story and sends a PUT request to update the story.
 * - handleDelete: Calls the deleteStory utility function and navigates back to the main menu after deletion.
 *
 * Debugging:
 * - Console logs to track the fetched story, update, and delete operations.
 *
 * Rendering:
 * - Renders the story content.
 * - Renders a form to add new content to the story.
 * - Renders buttons to navigate back to the main menu and delete the story.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */
