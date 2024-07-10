import React, { useState, useRef, useContext } from 'react';
import { AgentContext } from '../contexts/AgentContext'; 
import HamburgerMenu from './HamburgerMenu';
import Tooltip from './Tooltip';
import Modal from './Modal';
import LoginRegister from './LoginRegister';
import AgentProfile from './AgentProfile';
import Button from './Button';
import './MainMenu.css';

function MainMenu({ onActionSelected }) {
  const { agent } = useContext(AgentContext);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  const menuItems = [
    { label: 'Settings', onClick: () => setIsModalOpen(true) },
    {
      label: agent ? agent.username : 'Login/Signup',
      onClick: () => agent ? setIsProfileOpen(true) : setIsModalOpen(true)
    }
  ];

  console.log('Rendering MainMenu Component');

  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <HamburgerMenu items={menuItems} />
      <div>
        <Button
          label="Start a Story"
          onClick={handleStartStory}
          onMouseEnter={(e) => handleMouseEnter('Start a new story and embark on an exciting adventure.', e, 500)}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div>
        <Button
          label="Browse Stories"
          onClick={handleBrowseStories}
          onMouseEnter={(e) => handleMouseEnter('Browse through existing stories to find something interesting.', e, 500)}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div>
        <Button
          label="Continue a Story"
          onClick={handleContinueStory}
          onMouseEnter={(e) => handleMouseEnter('Continue your previously started story.', e, 500)}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      {/* Stubbed for future core actions */}
      <div
        onMouseEnter={(e) => handleMouseEnter('Achievements are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <Button label="Achievements" disabled />
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Settings are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <Button label="Settings" disabled />
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Extras are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <Button label="Extras" disabled />
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Credits are currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <Button label="Credits" disabled />
      </div>
      <div
        onMouseEnter={(e) => handleMouseEnter('Exit is currently disabled. Check back in future updates.', e)}
        onMouseLeave={handleMouseLeave}
      >
        <Button label="Exit" disabled />
      </div>
      <Tooltip message={tooltipMessage} visible={tooltipVisible} position={tooltipPosition} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginRegister onClose={() => setIsModalOpen(false)} />
      </Modal>
      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <AgentProfile onClose={() => setIsProfileOpen(false)} />
      </Modal>
    </div>
  );
}

export default MainMenu;

/**
 * ACS - MainMenu.js
 *
 * This component renders the main menu with options to start a new story, browse existing stories, and continue a story.
 * It also includes a hamburger menu with options for settings and login/signup.
 * The tooltip displays a summary description when buttons are hovered over.
 *
 * Props:
 * - onActionSelected: Function to notify the parent component of the selected action.
 *
 * State:
 * - tooltipMessage: String to store the message to be displayed in the tooltip.
 * - tooltipVisible: Boolean to track the visibility of the tooltip.
 * - tooltipPosition: Object to track the position of the tooltip.
 * - isModalOpen: Boolean to control the visibility of the login/register modal.
 * - isProfileOpen: Boolean to control the visibility of the profile modal.
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
