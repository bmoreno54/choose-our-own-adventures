import React, { useState, useContext } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import './Login.css';

const Login = ({ onClose }) => {
  const { login } = useContext(AgentContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, onClose);  // Pass the onClose callback
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

/**
 * ACS - Login.js
 *
 * This component renders the login form.
 *
 * State:
 * - email: Holds the input value for the email.
 * - password: Holds the input value for the password.
 * - error: Holds the error message to be displayed if login fails.
 *
 * Handlers:
 * - handleSubmit: Handles the form submission for logging in.
 *
 * Rendering:
 * - Renders the login form with email and password fields.
 * - Displays an error message if login fails.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the state and handlers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
