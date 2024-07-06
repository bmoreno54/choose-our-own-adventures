// client/src/components/MainMenu.js

import React from 'react';

function MainMenu({ onStart, onBrowse, onContinue }) {
  console.log('Rendering MainMenu Component');

  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <button onClick={onStart}>Start a Story</button>
      <button onClick={onBrowse}>Browse Stories</button>
      <button onClick={onContinue}>Continue a Story</button>
      {/* Stubbed for future core actions */}
      <button disabled>Future Action 1</button>
      <button disabled>Future Action 2</button>
    </div>
  );
}

export default MainMenu;

/**
 * ACS - MainMenu.js
 *
 * This component renders the main menu with options to start a new story, browse existing stories, and continue a story.
 * 
 * Props:
 * - onStart: Function to handle the 'Start a Story' action.
 * - onBrowse: Function to handle the 'Browse Stories' action.
 * - onContinue: Function to handle the 'Continue a Story' action.
 * 
 * Debugging:
 * - Console logs to track the rendering of the component.
 * 
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Note: Review this file for modularity and refactoring needs.
 */
