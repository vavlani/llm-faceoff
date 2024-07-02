import React from 'react';
import { FaCog, FaTimes } from 'react-icons/fa';

const Settings = ({ isOpen, toggleSettings, settings, updateSetting }) => {
  if (!isOpen) {
    return (
      <button className="settings-icon" onClick={toggleSettings}>
        <FaCog />
      </button>
    );
  }

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <button className="close-settings" onClick={toggleSettings}>
          <FaTimes />
        </button>
        <h2>Settings</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => updateSetting('darkMode', !settings.darkMode)}
            />
            Dark Mode
          </label>
        </div>
        <div className="setting-item">
          <label>
            Font Size:
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
