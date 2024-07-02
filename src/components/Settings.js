import React from 'react';
import { FaCog, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const Settings = ({ isOpen, toggleSettings, settings, updateSetting }) => {
  const themeOptions = [
    { value: 'earthyBrown', label: 'Earthy Brown' },
    { value: 'oceanBlue', label: 'Ocean Blue' },
    { value: 'whisperSlate', label: 'Whisper Slate' },
  ];

  return (
    <>
      <button className={`settings-icon ${isOpen ? 'active' : ''}`} onClick={toggleSettings}>
        <FaCog />
      </button>
      <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
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
    </>
  );
};

export default Settings;
