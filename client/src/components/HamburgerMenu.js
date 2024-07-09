import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    setIsOpen(false);
    item.onClick();
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </button>
      {isOpen && (
        <ul className="menu-list">
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;

/**
 * ACS - HamburgerMenu.js
 *
 * This component provides a reusable hamburger menu.
 *
 * Props:
 * - items: Array of menu items, each with a label and onClick function.
 *
 * State:
 * - isOpen: Boolean to control the visibility of the menu.
 *
 * Handlers:
 * - setIsOpen: Toggles the menu visibility.
 * - handleItemClick: Closes the menu and calls the item's onClick function.
 *
 * Rendering:
 * - Renders the hamburger icon and menu list if isOpen is true.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Document the purpose, logic, and design decisions for the handlers.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
