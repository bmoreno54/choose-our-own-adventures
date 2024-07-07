// utils/ghostText.js

/**
 * ACS - ghostText.js
 *
 * This file contains utility functions for generating and updating ghost text hints.
 *
 * Functions:
 * - getGhostText: Generates ghost text based on the user's input.
 */

/**
 * Generates ghost text based on the user's input.
 * @param {string} input - The user's input string.
 * @returns {string} - The ghost text hint to be displayed.
 */
export function getGhostText(input) {
  // ACS: Customize the ghost text based on specific requirements.
  if (!input.trim()) return " Start typing your story...";
  if (input.length < 20) return " Keep going...";
  if (!/[.!?]$/.test(input)) return " End your sentence with a period, exclamation mark, or question mark.";
  return "";
}
