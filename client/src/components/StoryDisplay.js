import React from 'react';
import './StoryDisplay.css';

const StoryDisplay = ({ content }) => {
  return (
    <div className="story-display">
      {content.split('\n').map((paragraph, index) => (
        <p key={index} className="story-paragraph">{paragraph}</p>
      ))}
    </div>
  );
};

export default StoryDisplay;

/**
 * ACS - StoryDisplay.js
 *
 * This component displays the story content with each paragraph separated by a line break.
 *
 * Props:
 * - content: The story content to display.
 *
 * Rendering:
 * - Splits the content by line breaks and renders each paragraph in a separate <p> tag.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the rendering of paragraphs.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
