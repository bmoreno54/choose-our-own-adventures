import React, { useState, useContext } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import './Register.css';

const Register = () => {
  const { register } = useContext(AgentContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Default Persona:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

/**
 * ACS - Register.js
 *
 * This component renders the registration form and handles the registration logic, including error handling for duplicate usernames or emails.
 *
 * State:
 * - username: Holds the input value for the username.
 * - email: Holds the input value for the email.
 * - password: Holds the input value for the password.
 * - error: Holds the error message to be displayed if registration fails.
 *
 * Handlers:
 * - handleSubmit: Handles the form submission for registration.
 *
 * Rendering:
 * - Renders the registration form with username, email, and password fields.
 * - Displays an error message if registration fails.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the state and handlers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
