import React from 'react';
import './Button.css';

const Button = ({ label, onClick, onMouseEnter, onMouseLeave, className = '', disabled }) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;


/**
 * ACS - Button.js
 *
 * This file defines a reusable button component with customizable label, click handler, and class name.
 *
 * Props:
 * - label: The text to display on the button.
 * - onClick: The function to call when the button is clicked.
 * - className: Optional additional class names for styling.
 * - disabled: Boolean to indicate if the button is disabled.
 *
 * Rendering:
 * - Renders a button with the provided label and click handler.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Document the purpose, logic, and design decisions for the props and rendering.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
