import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

/**
 * ACS - Modal.js
 *
 * This component provides a reusable modal window.
 *
 * Props:
 * - isOpen: Boolean to control the visibility of the modal.
 * - onClose: Function to handle closing the modal.
 * - children: Content to be displayed inside the modal.
 *
 * Handlers:
 * - onClose: Closes the modal when overlay or close button is clicked.
 *
 * Rendering:
 * - Renders the modal overlay and content if isOpen is true.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Document the purpose, logic, and design decisions for the handlers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
