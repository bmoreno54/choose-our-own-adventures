import React, { useEffect, useState, useContext } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import { deleteStory } from '../utils/storyActions';
import Cookies from 'js-cookie';
import './ContinueStory.css';

function ContinueStory({ onSelectStory, onBack }) {
  const { agent } = useContext(AgentContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        let url = '/api/stories';
        let options = {
          headers: {
            'Authorization': agent ? `Bearer ${localStorage.getItem('token')}` : ''
          }
        };

        const params = new URLSearchParams();

        if (agent) {
          params.append('contributor', agent.username);
          console.log(`Logged in as ${agent.username}. Fetching stories with contributor: ${agent.username}`); // Debugging line
        } else {
          const storyIds = Cookies.get('participatedStories') ? JSON.parse(Cookies.get('participatedStories')) : [];
          console.log('Story IDs from cookies:', storyIds); // Debugging line
          if (storyIds.length > 0) {
            params.append('ids', storyIds.join(','));
            console.log(`Anonymous user. Fetching stories with IDs: ${storyIds.join(',')}`); // Debugging line
          }
          // Exclude akabilly and anonymous contributors
          params.append('excludeContributors', 'akabilly,unnamed');
          console.log('Excluding stories by contributors: akabilly, unnamed'); // Debugging line
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        console.log('Fetching stories with URL:', url); // Debugging line
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('Stories fetched:', data); // Debugging line
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
      if (!agent) {
        // Update cookies for anonymous users
        let storyIds = Cookies.get('participatedStories') ? JSON.parse(Cookies.get('participatedStories')) : [];
        storyIds = storyIds.filter(id => id !== storyId);
        Cookies.set('participatedStories', JSON.stringify(storyIds), { expires: 7 });
      }
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
              <span className="story-author"> - {story.author}</span> {/* Display the author */}
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
 * Context:
 * - AgentContext: Used to get the current agent's information and token for authorization.
 *
 * State:
 * - stories: Holds the list of stories fetched from the backend.
 *
 * useEffect:
 * - Fetches the list of stories based on the agent's participation.
 *   - If the agent is logged in, fetches stories they contributed to.
 *   - If the agent is not logged in, fetches stories based on cookies and excludes non-anonymous contributors.
 *
 * Handlers:
 * - handleDelete: Calls the deleteStory utility function with the current agent's username and updates the state to remove the deleted story.
 *   - For anonymous users, also updates the cookie storing participated story IDs.
 *
 * Debugging:
 * - Console logs to track the fetched stories and delete operations.
 *
 * Rendering:
 * - Renders a list of stories with options to continue or delete them.
 * - Displays the first sentence of each story along with the author's name.
 * - Renders a button to navigate back to the main menu.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */
