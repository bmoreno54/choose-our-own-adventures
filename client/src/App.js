import React, { useEffect, useState } from 'react';
import AddStory from './components/AddStory';
import BrowseStories from './components/BrowseStories';
import ContinueStory from './components/ContinueStory';
import StoryInteraction from './components/StoryInteraction';
import MainMenu from './components/MainMenu';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [currentAction, setCurrentAction] = useState(null);
  const [storyId, setStoryId] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    fetch('/api')
      .then(response => {
        console.log('API response:', response);
        return response.json();
      })
      .then(data => {
        console.log('API data:', data);
        setMessage(data.message);
      })
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  const handleActionSelected = (action) => {
    setCurrentAction(action);
  };

  const handleStoryInteraction = (id) => {
    setStoryId(id);
    setCurrentAction('interact');
  };

  const renderContent = () => {
    switch (currentAction) {
      case 'start':
        return <AddStory onBack={() => setCurrentAction(null)} onStoryCreated={handleStoryInteraction} />;
      case 'browse':
        return <BrowseStories onSelectStory={handleStoryInteraction} onBack={() => setCurrentAction(null)} />;
      case 'continue':
        return <ContinueStory onSelectStory={handleStoryInteraction} onBack={() => setCurrentAction(null)} />;
      case 'interact':
        return <StoryInteraction storyId={storyId} onBack={() => setCurrentAction(null)} />;
      default:
        return <MainMenu onActionSelected={handleActionSelected} />;
    }
  };

  console.log('Rendering App Component');

  return (
    <div className="App">
      <header className="App-header">
        <small>{message}</small> {/* Display the message from the backend */}
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

/**
 * ACS - App.js
 *
 * This file sets up the main React component, fetches a welcome message from the backend, and includes a main menu for different actions.
 *
 * Imports:
 * - React: The core library for building React components.
 * - useEffect, useState: React hooks for managing side effects and state.
 * - AddStory: The component for adding new stories.
 * - BrowseStories: The component for browsing existing stories.
 * - ContinueStory: The component for continuing an existing story.
 * - StoryInteraction: The unified component for interacting with a story.
 * - MainMenu: The main menu component.
 * - './App.css': The CSS file for styling the component.
 *
 * State:
 * - message: Holds the message fetched from the backend.
 * - currentAction: Tracks the current action to display the appropriate component.
 * - storyId: The ID of the story to interact with.
 *
 * useEffect:
 * - Fetches a message from the /api endpoint and sets the message state.
 *
 * Handlers:
 * - handleActionSelected: Sets the current action based on the selected menu option.
 * - handleStoryInteraction: Sets the current action to 'interact' with the provided story ID.
 *
 * Debugging:
 * - Console logs to track the component state and method calls.
 *
 * Rendering:
 * - Renders the main UI, including the main menu and the appropriate component based on the current action.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Ensure all related files are adequately documented and linked.
 */
