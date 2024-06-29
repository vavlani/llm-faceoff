import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import LayoutControls from './components/LayoutControls';
import ModelSelector from './components/ModelSelector';
import CommonInput from './components/CommonInput';
import { removeWindow, toggleWebAccess, sendMessage } from './utils/chatUtils';
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
        <LayoutControls layout={layout} setLayout={setLayout} />
        <ModelSelector selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
        <CommonInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;
