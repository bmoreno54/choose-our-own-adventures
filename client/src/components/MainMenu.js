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
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const handleMouseEnter = (message, event, delay = 0) => {
    console.log(`handleMouseEnter: message=${message}, delay=${delay}`);
    clearTimeout(tooltipTimeoutRef.current); // Clear any existing timeout
    tooltipTimeoutRef.current = setTimeout(() => {
      const { top, left, width } = event.target.getBoundingClientRect();
      console.log(`Tooltip position: top=${top}, left=${left}, width=${width}`);
      setTooltipMessage(message);
      setTooltipPosition({ top: top - 40, left: left + width / 2 });
      setTooltipVisible(true);
      console.log('Tooltip is set to visible');
    }, delay);
  };

  const handleMouseLeave = () => {
    console.log('handleMouseLeave');
    clearTimeout(tooltipTimeoutRef.current);
    setTooltipVisible(false);
  };

  const handleStartStory = () => {
    console.log('Start Story button clicked');
    onActionSelected('startDirect');
  };

  const handleBrowseStories = () => {
    console.log('Browse Stories button clicked');
    onActionSelected('browse');
  };

  const handleContinueStory = () => {
    console.log('Continue Story button clicked');
    onActionSelected('continue');
  };

  const handleExit = () => {
    console.log('Exit button clicked');
    window.close();
  };

  const menuItems = [
    {
      label: agent ? agent.username : 'Login/Signup',
      onClick: () => agent ? setIsProfileOpen(true) : setIsModalOpen(true)
    }
  ];

  const renderCreditsModal = () => (
    <Modal isOpen={isCreditsOpen} onClose={() => setIsCreditsOpen(false)}>
      <div className="credits-content">
        <h2>Credits</h2>
        <p>Created by akabilly and the AI team.</p>
      </div>
    </Modal>
  );

  console.log('Rendering MainMenu Component');

  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <HamburgerMenu items={menuItems} />
      <div>
        <Button
          label="Start a Story"
          onClick={handleStartStory}
          onMouseEnter={(e) => {
            console.log('Mouse entered Start a Story');
            handleMouseEnter('Start a new story and embark on an exciting adventure.', e, 500);
          }}
          onMouseLeave={() => {
            console.log('Mouse left Start a Story');
            handleMouseLeave();
          }}
        />
      </div>
      <div>
        <Button
          label="Browse Stories"
          onClick={handleBrowseStories}
          onMouseEnter={(e) => {
            console.log('Mouse entered Browse Stories');
            handleMouseEnter('Browse through existing stories to find something interesting.', e, 500);
          }}
          onMouseLeave={() => {
            console.log('Mouse left Browse Stories');
            handleMouseLeave();
          }}
        />
      </div>
      <div>
        <Button
          label="Continue a Story"
          onClick={handleContinueStory}
          onMouseEnter={(e) => {
            console.log('Mouse entered Continue a Story');
            handleMouseEnter('Continue your previously started story.', e, 500);
          }}
          onMouseLeave={() => {
            console.log('Mouse left Continue a Story');
            handleMouseLeave();
          }}
        />
      </div>
      <div
        onMouseEnter={(e) => {
          console.log('Mouse entered Achievements (disabled)');
          handleMouseEnter('Achievements are currently disabled. Check back in future updates.', e);
        }}
        onMouseLeave={() => {
          console.log('Mouse left Achievements (disabled)');
          handleMouseLeave();
        }}
      >
        <Button label="Achievements" className="disabled-button" disabled />
      </div>
      <div
        onMouseEnter={(e) => {
          console.log('Mouse entered Daily Sentence (disabled)');
          handleMouseEnter('Daily sentence feature is currently disabled. Check back in future updates.', e);
        }}
        onMouseLeave={() => {
          console.log('Mouse left Daily Sentence (disabled)');
          handleMouseLeave();
        }}
      >
        <Button label="Daily Sentence" className="disabled-button" disabled />
      </div>
      <div>
        <Button
          label="Credits"
          onClick={() => {
            console.log('Credits button clicked');
            setIsCreditsOpen(true);
          }}
          onMouseEnter={(e) => {
            console.log('Mouse entered Credits');
            handleMouseEnter('View the credits.', e, 500);
          }}
          onMouseLeave={() => {
            console.log('Mouse left Credits');
            handleMouseLeave();
          }}
        />
      </div>
      <div>
        <Button
          label="Exit"
          onClick={handleExit}
          onMouseEnter={(e) => {
            console.log('Mouse entered Exit');
            handleMouseEnter('Exit the application.', e, 500);
          }}
          onMouseLeave={() => {
            console.log('Mouse left Exit');
            handleMouseLeave();
          }}
        />
      </div>
      <Tooltip message={tooltipMessage} visible={tooltipVisible} position={tooltipPosition} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginRegister onClose={() => setIsModalOpen(false)} />
      </Modal>
      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <AgentProfile onClose={() => setIsProfileOpen(false)} />
      </Modal>
      {renderCreditsModal()}
    </div>
  );
}

export default MainMenu;

/**
 * ACS - MainMenu.js
 *
 * This component renders the main menu with options to start a new story, browse existing stories, and continue a story.
 * It also includes a hamburger menu with options for login/signup.
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
 * - isCreditsOpen: Boolean to control the visibility of the credits modal.
 *
 * Handlers:
 * - handleStartStory: Notifies the parent component to start a new story.
 * - handleBrowseStories: Notifies the parent component to browse existing stories.
 * - handleContinueStory: Notifies the parent component to continue a story.
 * - handleExit: Closes the application.
 * - handleMouseEnter: Sets the tooltip message and position when a button is hovered over.
 * - handleMouseLeave: Hides the tooltip when the mouse leaves a button.
 *
 * Debugging:
 * - Console logs to track the rendering of the component.
 *
 * Future Enhancements:
 * - Achievements: Display unlocked achievements.
 * - Daily Sentence: Feature for daily sentence input.
 *
 * File Relationships:
 * - This file is linked to MainMenu.css for styling.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Note: Review this file for modularity and refactoring needs.
 * - Check MainMenu.css for related functionality and ensure visual consistency.
 */
