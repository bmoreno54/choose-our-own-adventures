/**
 * ACS - validation.js
 *
 * This file contains utility functions for validating user input.
 *
 * Functions:
 * - isValidSentence: Checks if a string ends with terminal punctuation.
 */

/**
 * Checks if the input string ends with terminal punctuation.
 * @param {string} input - The input string to validate.
 * @returns {boolean} - Returns true if the string ends with ., !, or ?, otherwise false.
 */
export function isValidSentence(input) {
  // ACS: Regular expression to check for terminal punctuation.
  const terminalPunctuation = /[.!?]$/;
  return terminalPunctuation.test(input);
}
