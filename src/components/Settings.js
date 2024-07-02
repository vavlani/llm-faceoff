import React from 'react';
import { FaCog, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const Settings = ({ isOpen, toggleSettings, settings, updateSetting }) => {
  if (!isOpen) {
    return (
      <button className="settings-icon" onClick={toggleSettings}>
        <FaCog />
      </button>
    );
  }

  const themeOptions = [
    { value: 'earthyBrown', label: 'Earthy Brown' },
    { value: 'oceanBlue', label: 'Ocean Blue' },
    { value: 'forestGreen', label: 'Forest Green' },
  ];

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <button className="close-settings" onClick={toggleSettings}>
          <FaTimes />
        </button>
        <h2>Settings</h2>
        <div className="setting-item">
          <label>Theme:</label>
          <Select
            value={themeOptions.find(option => option.value === settings.theme)}
            onChange={(selectedOption) => updateSetting('theme', selectedOption.value)}
            options={themeOptions}
            className="theme-selector"
            classNamePrefix="react-select"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
