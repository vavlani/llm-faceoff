import React from 'react';
import { FaCog, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const Settings = ({ isOpen, toggleSettings, settings, updateSetting }) => {
  const themeOptions = [
    { value: 'earthyBrown', label: 'Earthy Brown' },
    { value: 'oceanBlue', label: 'Ocean Blue' },
    { value: 'whisperSlate', label: 'Whisper Slate' },
  ];

  const handleApiKeyChange = (provider, value) => {
    updateSetting('apiKeys', { ...settings.apiKeys, [provider]: value });
  };

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
          <h3>API Keys</h3>
          {Object.entries(settings.apiKeys).map(([provider, key]) => (
            <div className="setting-item" key={provider}>
              <label htmlFor={`${provider}ApiKey`}>{provider.charAt(0).toUpperCase() + provider.slice(1)}:</label>
              <input
                type="password"
                id={`${provider}ApiKey`}
                value={key}
                onChange={(e) => handleApiKeyChange(provider, e.target.value)}
                placeholder={`Enter ${provider} API key`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Settings;
