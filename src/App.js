import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';
import ChatWindow from './components/ChatWindow';
import { allModels } from './utils/modelData';

const App = () => {
  const [layout, setLayout] = useState(3);
  const [selectedModels, setSelectedModels] = useState(
    allModels.slice(0, 2).map(model => ({
      ...model,
      messages: [{ text: model.initialMessage, sender: 'ai' }],
      webAccess: false
    }))
  );
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      const aiResponse = { text: `You said: ${input}`, sender: 'ai' };
      setSelectedModels(prevModels => prevModels.map(model => ({
        ...model,
        messages: [...model.messages, newMessage, aiResponse]
      })));
      setInput('');
    }
  };

  const removeWindow = (modelToRemove) => {
    setSelectedModels(prevModels => prevModels.filter(model => model.value !== modelToRemove.value));
  };

  const toggleWebAccess = (modelToToggle) => {
    setSelectedModels(prevModels => prevModels.map(model => 
      model.value === modelToToggle.value ? {...model, webAccess: !model.webAccess} : model
    ));
  };

  const sendMessage = (modelToUpdate, message) => {
    const newMessage = { text: message, sender: 'user' };
    const aiResponse = { text: `You said: ${message}`, sender: 'ai' };
    setSelectedModels(prevModels => prevModels.map(model => 
      model.value === modelToUpdate.value ? {...model, messages: [...model.messages, newMessage, aiResponse]} : model
    ));
  };

  return (
    <div className="app">
      <div 
        className="chat-grid"
        style={{
          gridTemplateColumns: `repeat(${layout}, 1fr)`,
        }}
      >
        {selectedModels.map((model, index) => (
          <ChatWindow 
            key={index}
            name={model.label}
            messages={model.messages}
            onRemove={() => removeWindow(model)}
            webAccess={model.webAccess}
            toggleWebAccess={() => toggleWebAccess(model)}
            onSendMessage={(message) => sendMessage(model, message)}
          />
        ))}
      </div>
      <div className="bottom-bar">
        <div className="layout-controls">
          <button onClick={() => setLayout(2)} className={layout === 2 ? 'active' : ''}>2 Windows</button>
          <button onClick={() => setLayout(3)} className={layout === 3 ? 'active' : ''}>3 Windows</button>
        </div>
        <Select
          isMulti
          name="models"
          options={allModels}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedModels}
          onChange={(selected) => setSelectedModels(selected.map(option => ({
            ...option,
            messages: option.messages || [{ text: option.initialMessage, sender: 'ai' }],
            webAccess: false
          })))}
          placeholder="Select models..."
        />
        <form onSubmit={handleSubmit} className="common-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message to send to all chat windows..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;
