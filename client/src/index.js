import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SettingsProvider } from './contexts/SettingsContext';
import { AgentProvider } from './contexts/AgentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <AgentProvider>
        <App />
      </AgentProvider>
    </SettingsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * ACS - index.js
 *
 * This file is the entry point of the React application.
 *
 * Imports:
 * - React: The core library for building React components.
 * - ReactDOM: Used for rendering React components to the DOM.
 * - './index.css': The CSS file for styling the application.
 * - App: The main application component.
 * - reportWebVitals: Utility for measuring application performance.
 * - SettingsProvider: Context provider for managing application settings.
 * - AgentProvider: Context provider for managing agent authentication state.
 *
 * Rendering:
 * - Wraps the App component with SettingsProvider and AgentProvider to provide context values.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Document the purpose, logic, and design decisions for the context providers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
