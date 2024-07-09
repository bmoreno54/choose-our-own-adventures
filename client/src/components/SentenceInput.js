import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { isValidSentence } from '../utils/validation';
import { getGhostText } from '../utils/ghostText';
import './SentenceInput.css';

const SentenceInput = forwardRef(({ value, onChange, onSubmit }, ref) => {
  const [input, setInput] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setInput(value);
    console.log('Input state updated from props:', value);
  }, [value]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
    console.log('Input focused');
  }, [ref]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log('Input change:', value);

    // Allow input if it's deleting characters or doesn't end with terminal punctuation
    if (!isValidSentence(input) || value.length < input.length) {
      setInput(value);
      onChange(value);
    }
  };

  const handleKeyDown = (e) => {
    console.log('Key down:', e.key);
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isValidSentence(input)) {
        onSubmit();
        console.log('Enter pressed, valid sentence:', input);
      }
    }
  };

  const ghostText = isValidSentence(input) ? "Press Enter to submit your sentence." : getGhostText(input);
  console.log('Ghost text:', ghostText);

  return (
    <div className="sentence-input-wrapper">
      <div className="sentence-input-container">
        <div className="textarea-wrapper">
          <textarea
            ref={ref || inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your story..."
            className="hidden-textarea"
          ></textarea>
          <div className="visible-textarea">
            <span className="input-text">{input}</span>
            <span className="ghost-text">{ghostText}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SentenceInput;

/**
 * ACS - SentenceInput.js
 *
 * This component provides a reusable input field for adding sentences with ghost text hints and validation.
 *
 * Props:
 * - value: The current input value.
 * - onChange: Function to handle input changes.
 * - onSubmit: Function to handle input submission when Enter key is pressed.
 *
 * State:
 * - input: The current input value.
 *
 * Handlers:
 * - handleInputChange: Updates the input state and calls the onChange function.
 * - handleKeyDown: Handles Enter key press to submit input if valid.
 * - useEffect: Updates the input state when the parent component's value changes.
 * - useEffect: Focuses the input when the ref is set.
 *
 * Rendering:
 * - Renders a hidden textarea for capturing input.
 * - Renders a visible div containing both the user's input and the ghost text.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the handleInputChange, handleKeyDown, and useEffect functions.
 * - Ensure all functions are clearly commented with their roles and interactions.
 * - Verify the CSS file to ensure visual styling is consistently applied.
 */
