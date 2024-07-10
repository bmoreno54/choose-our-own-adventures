import React, { useEffect, useState, useContext } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import { deleteStory } from '../utils/storyActions';
import './BrowseStories.css';

function BrowseStories({ onSelectStory, onBack }) {
  const { agent } = useContext(AgentContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories', {
          headers: {
            'Authorization': agent ? `Bearer ${localStorage.getItem('token')}` : ''
          }
        });
        const data = await response.json();
        console.log('Stories fetched:', data);
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, [agent]);

  const handleDelete = async (storyId) => {
    try {
      await deleteStory(storyId, agent ? agent.username : 'anonymous');
      setStories(stories.filter(story => story._id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  return (
    <div className="browse-stories-container">
      <h2>Browse Stories</h2>
      <button onClick={onBack} className="back-button">Back to Main Menu</button>
      <ul className="story-list">
        {stories.map(story => (
          <li key={story._id} className="story-item">
            <button 
              className="story-link"
              onClick={() => onSelectStory(story._id)}
            >
              {story.content.split('\n')[0]} {/* Display the first sentence */}
              <span className="story-author"> - {story.author}</span> {/* Display the author */}
            </button>
            <button className="delete-button" onClick={() => handleDelete(story._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseStories;

/**
 * ACS - BrowseStories.js
 *
 * This component allows users to browse existing stories fetched from the backend and delete them if needed.
 *
 * Props:
 * - onSelectStory: A function to handle the selection of a story for interaction.
 * - onBack: A function to navigate back to the main menu.
 *
 * Context:
 * - AgentContext: Used to get the current agent's information and token for authorization.
 *
 * State:
 * - stories: Holds the list of stories fetched from the backend.
 *
 * useEffect:
 * - Fetches the list of stories from the /api/stories endpoint, including the authorization header if the agent is logged in.
 *
 * Handlers:
 * - handleDelete: Calls the deleteStory utility function with the current agent's username and updates the state to remove the deleted story.
 *
 * Debugging:
 * - Console logs to track the fetched stories and delete operations.
 *
 * Rendering:
 * - Renders a list of stories with options to read or delete them.
 * - Displays the first sentence of each story along with the author's name.
 * - Renders a button to navigate back to the main menu.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */
