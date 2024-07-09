import React, { useState, useRef } from 'react';
import Tooltip from './Tooltip';
import './MainMenu.css';

function MainMenu({ onActionSelected }) {
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipTimeoutRef = useRef(null);

  const handleMouseEnter = (message, event, delay = 0) => {
    tooltipTimeoutRef.current = setTimeout(() => {
      const { top, left, width } = event.target.getBoundingClientRect();
      setTooltipMessage(message);
      setTooltipPosition({ top: top - 40, left: left + width / 2 });
      setTooltipVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(tooltipTimeoutRef.current);
    setTooltipVisible(false);
  };

  const handleStartStory = () => {
    onActionSelected('startDirect');
  };

  const handleBrowseStories = () => {
    onActionSelected('browse');
  };

  const handleContinueStory = () => {
    onActionSelected('continue');
  };

  console.log('Rendering MainMenu Component');

  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <div>
        <button 
          onClick={handleStartStory}
          onMouseEnter={(e) => handleMouseEnter('Start a new story and embark on an exciting adventure.', e, 500)}
          onMouseLeave={handleMouseLeave}
        >
          Start a Story
        </button>
      </div>
      <div>
        <button 
          onClick={handleBrowseStories}
          onMouseEnter={(e) => handleMouseEnter('Browse through existing stories to find something interesting.', e, 500)}
          onMouseLeave={handleMouseLeave}
        >
          Browse Stories
        </button>
      </div>
      <div>
        <button 
          onClick={handleContinueStory}
          onMouseEnter={(e) => handleMouseEnter('Continue your previously started story.', e, 500)}
          onMouseLeave={handleMouseLeave}
        >
          Continue a Story
        </button>
      </div>
      {/* Stubbed for future core actions */}
      <div
        onMouseEnter={(e) => handleMouseEnter('Achievements are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <button disabled>
          Achievements
        </button>
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Settings are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <button disabled>
          Settings
        </button>
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Extras are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <button disabled>
          Extras
        </button>
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Credits are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <button disabled>
          Credits
        </button>
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Exit is currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <button disabled>
          Exit
        </button>
      </div>
      <Tooltip message={tooltipMessage} visible={tooltipVisible} position={tooltipPosition} />
    </div>
  );
}

export default MainMenu;

/**
 * ACS - MainMenu.js
 *
 * This component renders the main menu with options to start a new story, browse existing stories, and continue a story.
 * It also includes disabled buttons for future actions with a custom tooltip to inform users when these buttons are hovered over.
 * The tooltip also displays a summary description when buttons are hovered over.
 * 
 * Props:
 * - onActionSelected: Function to notify the parent component of the selected action.
 * 
 * State:
 * - tooltipMessage: String to store the message to be displayed in the tooltip.
 * - tooltipVisible: Boolean to track the visibility of the tooltip.
 * - tooltipPosition: Object to track the position of the tooltip.
 * 
 * Handlers:
 * - handleStartStory: Notifies the parent component to start a new story.
 * - handleBrowseStories: Notifies the parent component to browse existing stories.
 * - handleContinueStory: Notifies the parent component to continue a story.
 * - handleMouseEnter: Sets the tooltip message and position when a button is hovered over.
 * - handleMouseLeave: Hides the tooltip when the mouse leaves a button.
 * 
 * Debugging:
 * - Console logs to track the rendering of the component.
 * 
 * Future Enhancements:
 * - Achievements: Display unlocked achievements.
 * - Settings: Allow users to adjust game settings (audio, graphics, controls).
 * - Extras: Provide access to additional content such as concept art, bonus stories, etc.
 * - Credits: Display the game credits.
 * - Exit: Provide a way to exit the game.
 * 
 * File Relationships:
 * - This file is linked to MainMenu.css for styling.
 * 
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Note: Review this file for modularity and refactoring needs.
 * - Check MainMenu.css for related styles and ensure visual consistency.
 */
