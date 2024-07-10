import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './LoginRegister.css';

const LoginRegister = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-register">
      <div className="tabs">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
      </div>
      {isLogin ? <Login onClose={onClose} /> : <Register />}
    </div>
  );
};

export default LoginRegister;

/**
 * ACS - LoginRegister.js
 *
 * This component renders a modal with tabs for login and register.
 *
 * State:
 * - isLogin: Boolean to track the active tab (login or register).
 *
 * Handlers:
 * - setIsLogin: Sets the active tab to login or register.
 *
 * Rendering:
 * - Renders the login or register component based on the active tab.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the state and handlers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
