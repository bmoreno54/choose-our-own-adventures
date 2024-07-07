import React, { useState, useEffect, useRef } from 'react';
import { isValidSentence } from '../utils/validation'; // Import the validation function
import { getGhostText } from '../utils/ghostText'; // Import the ghost text function
import './SentenceInput.css'; // Import the CSS for SentenceInput component

function SentenceInput({ value, onChange }) {
  const [input, setInput] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    // Update the input state when the parent component's value changes
    setInput(value);
  }, [value]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    // Allow input if the current content does not end with terminal punctuation
    if (!isValidSentence(input)) {
      setInput(value);
      onChange(value);
    }
  };

  const ghostText = getGhostText(input);

  return (
    <div className="sentence-input-container">
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing your story..."
      ></textarea>
      <div className="ghost-text-container">
        <span className="input-text">{input}</span>
        <span className="ghost-text">{ghostText}</span>
      </div>
      {isValidSentence(input) && <p className="validation-text">You cannot enter more text after terminal punctuation.</p>}
    </div>
  );
}

export default SentenceInput;

/**
 * ACS - SentenceInput.js
 *
 * This component provides a reusable input field for adding sentences with ghost text hints and validation.
 *
 * Props:
 * - value: The current input value.
 * - onChange: Function to handle input changes.
 *
 * State:
 * - input: The current input value.
 *
 * Handlers:
 * - handleInputChange: Updates the input state and calls the onChange function.
 * - useEffect: Updates the input state when the parent component's value changes.
 *
 * Rendering:
 * - Renders a textarea for user input.
 * - Renders a div containing both the user's input and the ghost text.
 * - Renders validation messages if the input ends with terminal punctuation.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the handleInputChange and useEffect functions.
 * - Ensure all functions are clearly commented with their roles and interactions.
 * - Verify the CSS file to ensure visual styling is consistently applied.
 */
