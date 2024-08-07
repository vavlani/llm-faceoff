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

  const apiKeyProviders = ['Google', 'Anthropic', 'OpenAI'];

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
          {apiKeyProviders.map((provider) => (
            <div className="setting-item" key={provider}>
              <label htmlFor={`${provider}ApiKey`}>{provider}:</label>
              <input
                type="password"
                id={`${provider}ApiKey`}
                value={settings.apiKeys[provider] || ''}
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
