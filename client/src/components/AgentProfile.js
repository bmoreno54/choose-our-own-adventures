import React, { useContext } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import Button from './Button';
import './AgentProfile.css';

const AgentProfile = ({ onClose }) => {
  const { agent, logout } = useContext(AgentContext);

  const handleLogout = () => {
    logout();
    onClose(); // Close the profile modal after logout
  };

  return (
    <div className="agent-profile">
      <h2>Agent Profile</h2>
      <div className="profile-detail">
        <label>Username:</label>
        <span>{agent.username}</span>
      </div>
      <div className="profile-detail">
        <label>Email:</label>
        <span>{agent.email}</span>
      </div>
      <div className="profile-detail">
        <label>Member Since:</label>
        <span>{new Date(agent.createdAt).toLocaleDateString()}</span>
      </div>
      <Button label="Logout" onClick={handleLogout} />
    </div>
  );
};

export default AgentProfile;

/**
 * ACS - AgentProfile.js
 *
 * This component renders the agent's profile information and includes a logout button.
 *
 * Props:
 * - agent: The authenticated agent's information (object with username, email, and createdAt fields).
 * - onClose: Function to close the profile modal.
 *
 * Methods:
 * - handleLogout: Calls the logout function from the AgentContext and closes the modal.
 *
 * Rendering:
 * - Displays the agent's username, email, membership date, and a logout button.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Document the purpose, logic, and design decisions for the state and handlers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
