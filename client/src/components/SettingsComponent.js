import React, { useContext, useState } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

const SettingsComponent = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  const handleSave = () => {
    updateSettings(localSettings);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-item">
        <label>Background Color:</label>
        <input
          type="color"
          name="backgroundColor"
          value={localSettings.backgroundColor}
          onChange={handleChange}
        />
      </div>
      <div className="settings-item">
        <label>Cursor Color:</label>
        <input
          type="color"
          name="cursorColor"
          value={localSettings.cursorColor}
          onChange={handleChange}
        />
      </div>
      <div className="settings-item">
        <label>Text Color:</label>
        <input
          type="color"
          name="textColor"
          value={localSettings.textColor}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SettingsComponent;

/**
 * ACS - SettingsComponent.js
 *
 * This component allows the user to update the settings for sentence input background color, cursor color, and text color.
 *
 * Context:
 * - Uses SettingsContext to access and update settings.
 *
 * State:
 * - localSettings: Holds the local state for settings until saved.
 *
 * Handlers:
 * - handleChange: Updates localSettings state when input values change.
 * - handleSave: Updates the global settings context with localSettings.
 *
 * Rendering:
 * - Renders input fields for background color, cursor color, and text color.
 * - Renders a save button to apply the changes.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 * - Document the purpose, logic, and design decisions for the handleChange and handleSave functions.
 * - Ensure all functions are clearly commented with their roles and interactions.
 */
