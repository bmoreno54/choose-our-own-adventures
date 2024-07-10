import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/agents/profile')
        .then(response => {
          setAgent(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching agent profile:', error);
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, onSuccess) => {
    try {
      const response = await axios.post('/api/agents/login', { email, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setAgent(response.data.agent);
      setFeedback('Login successful');
      onSuccess();  // Call the onSuccess callback
    } catch (error) {
      console.error('Error logging in:', error);
      setFeedback('Login failed');
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('/api/agents/register', { username, email, password });
      setFeedback('Registration successful');
    } catch (error) {
      console.error('Error registering:', error);
      setFeedback(error.response?.data?.error || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAgent(null);
    setFeedback('Logout successful');
  };

  return (
    <AgentContext.Provider value={{ agent, loading, login, register, logout, feedback }}>
      {children}
    </AgentContext.Provider>
  );
};

/**
 * ACS - AgentContext.js
 *
 * This file provides a context for managing agent authentication state.
 *
 * State:
 * - agent: Holds the authenticated agent's information.
 * - loading: Tracks the loading state during profile fetch.
 * - feedback: Holds feedback messages for authentication actions.
 *
 * Methods:
 * - login: Authenticates the agent and sets the token in local storage.
 * - register: Registers a new agent.
 * - logout: Clears the token and agent state.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Document the purpose, logic, and design decisions for state and methods.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
