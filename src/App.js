// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import CommonInput from './components/CommonInput';
import Settings from './components/Settings';
import { FaPlus, FaMinus, FaComments } from 'react-icons/fa';
import { removeWindow, toggleWebAccess, sendMessage, changeModel, copyToAllInputs, sendFromIndividualInputs, updateIndividualInput } from './utils/chatUtils';
import { allModels } from './utils/modelData';
import { initialSettings, applySettings } from './utils/settingsUtils';

const App = () => {
  // State variables
  const [scrollPosition, setScrollPosition] = useState(0);
  const [settings, setSettings] = useState(initialSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Effect to handle scroll position for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to apply settings when they change
  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  // Toggle settings panel
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Update a specific setting
  const updateSetting = (key, value) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings, [key]: value };
      localStorage.setItem('chatPlaygroundSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Load saved settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatPlaygroundSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  // State for selected models and common input
  const [selectedModels, setSelectedModels] = useState(
    allModels.slice(0, 2).map(model => ({
      ...model,
      messages: [{ text: model.initialMessage, sender: 'ai' }],
      webAccess: false
    }))
  );
  const [commonInput, setCommonInput] = useState('');

  // Function to update models
  const updateModels = (updatedModels) => {
    setSelectedModels(updatedModels);
  };

  // Handle model change
  const handleModelChange = (modelToChange, newModelValue) => {
    changeModel(modelToChange, newModelValue, selectedModels, allModels, updateModels);
  };

  // Handle submission of common input
  const handleCommonSubmit = (e) => {
    e.preventDefault();
    if (commonInput.trim()) {
      const updatedModels = selectedModels.map(model => ({
        ...model,
        messages: [
          ...model.messages,
          { text: commonInput, sender: 'user' },
          { text: `You said: ${commonInput}`, sender: 'ai' }
        ]
      }));
      updateModels(updatedModels);
      setCommonInput('');
    }
  };

  // Add a new chat window
  const addChatWindow = () => {
    if (selectedModels.length < 6) {
      const newModel = allModels.find(model => !selectedModels.some(m => m.value === model.value));
      if (newModel) {
        setSelectedModels([...selectedModels, {
          ...newModel,
          messages: [{ text: newModel.initialMessage, sender: 'ai' }],
          webAccess: false
        }]);
      }
    }
  };

  // Remove the last chat window
  const removeChatWindow = () => {
    if (selectedModels.length > 1) {
      setSelectedModels(selectedModels.slice(0, -1));
    }
  };

  // Copy common input to all chat windows
  const handleCopy = () => {
    copyToAllInputs(commonInput, selectedModels, updateModels);
  };

  // Send messages from individual inputs
  const handleSendIndividual = () => {
    sendFromIndividualInputs(selectedModels, updateModels);
  };

  return (
    <div className="app">
      {/* Title bar with sticky behavior based on scroll position */}
      <div className={`title-bar ${scrollPosition > 0 ? 'sticky' : ''}`}>
        <h1><FaComments className="title-icon" /> model-faceoff</h1>
        <Settings
          isOpen={isSettingsOpen}
          toggleSettings={toggleSettings}
          settings={settings}
          updateSetting={updateSetting}
        />
      </div>
      {/* Grid of chat windows */}
      <div className="chat-grid">
        {selectedModels.map((model, index) => (
          <ChatWindow 
            key={index}
            model={model}
            availableModels={allModels}
            messages={model.messages}
            onRemove={() => removeWindow(model, selectedModels, updateModels)}
            webAccess={model.webAccess}
            toggleWebAccess={() => toggleWebAccess(model, selectedModels, updateModels)}
            onSendMessage={(message) => sendMessage(model, message, selectedModels, updateModels)}
            onModelChange={(newModelValue) => handleModelChange(model, newModelValue)}
            currentInput={model.currentInput || ''}
            onInputChange={(model, input) => updateIndividualInput(model, input, selectedModels, updateModels)}
          />
        ))}
      </div>
      {/* Bottom bar with chat controls and common input */}
      <div className="bottom-bar">
        <div className="chat-controls">
          <div className="counter-widget">
            <div className="counter-title">Chat windows</div>
            <div className="counter-buttons">
              <button onClick={removeChatWindow} disabled={selectedModels.length <= 1}>
                <FaMinus />
              </button>
              <span>{selectedModels.length}</span>
              <button onClick={addChatWindow} disabled={selectedModels.length >= 6}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
        <CommonInput
          input={commonInput}
          setInput={setCommonInput}
          handleSubmit={handleCommonSubmit}
          handleCopy={handleCopy}
          handleSendIndividual={handleSendIndividual}
        />
      </div>
    </div>
  );
};

export default App;
