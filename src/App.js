import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import CommonInput from './components/CommonInput';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { removeWindow, toggleWebAccess, sendMessage, changeModel, copyToAllInputs, sendFromIndividualInputs } from './utils/chatUtils';
import { allModels } from './utils/modelData';

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [selectedModels, setSelectedModels] = useState(
    allModels.slice(0, 2).map(model => ({
      ...model,
      messages: [{ text: model.initialMessage, sender: 'ai' }],
      webAccess: false
    }))
  );
  const [commonInput, setCommonInput] = useState('');

  const updateModels = (updatedModels) => {
    setSelectedModels(updatedModels);
  };

  const handleModelChange = (modelToChange, newModelValue) => {
    changeModel(modelToChange, newModelValue, selectedModels, allModels, updateModels);
  };

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

  const removeChatWindow = () => {
    if (selectedModels.length > 1) {
      setSelectedModels(selectedModels.slice(0, -1));
    }
  };

  const handleCopy = () => {
    copyToAllInputs(commonInput, selectedModels, updateModels);
  };

  const handleSendIndividual = () => {
    sendFromIndividualInputs(selectedModels, updateModels);
  };

  return (
    <div className="app">
      <div className={`title-bar ${scrollPosition > 0 ? 'sticky' : ''}`}>
        <h1>Chat Playground</h1>
      </div>
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
          />
        ))}
      </div>
      <div className="bottom-bar">
        <div className="chat-controls">
          <div className="counter-widget">
            <button onClick={removeChatWindow} disabled={selectedModels.length <= 1}>
              <FaMinus />
            </button>
            <span>{selectedModels.length}</span>
            <button onClick={addChatWindow} disabled={selectedModels.length >= 6}>
              <FaPlus />
            </button>
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
