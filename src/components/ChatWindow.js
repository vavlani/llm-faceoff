import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaPaperPlane, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Select from 'react-select';

const ChatWindow = ({ model, availableModels, messages, onRemove, webAccess, toggleWebAccess, onSendMessage, onModelChange, currentInput, onInputChange }) => {
  const [input, setInput] = useState(currentInput || '');
  const [isSubheaderOpen, setIsSubheaderOpen] = useState(false);

  useEffect(() => {
    setInput(currentInput || '');
  }, [currentInput]);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useLayoutEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <Select
          value={availableModels.find(m => m.value === model.value)}
          onChange={(selectedOption) => onModelChange(selectedOption.value)}
          options={availableModels}
          className="model-selector"
          classNamePrefix="react-select"
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: '#f0f0f0',
              border: 'none',
              boxShadow: 'none',
              cursor: 'pointer',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 'bold',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#e6f2ff' : 'white',
              color: state.isSelected ? 'white' : 'black',
              fontFamily: "'Nunito', sans-serif",
            }),
          }}
        />
        <div className="header-controls">
          <label className="web-access-toggle">
            <input
              type="checkbox"
              checked={webAccess}
              onChange={toggleWebAccess}
            />
            <span className="slider"></span>
          </label>
          <span className="web-access-label">Web Access</span>
          <button onClick={onRemove} className="remove-btn">×</button>
          <button className="subheader-toggle" onClick={() => setIsSubheaderOpen(!isSubheaderOpen)}>
            {isSubheaderOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      <div className={`chat-subheader ${isSubheaderOpen ? 'open' : ''}`}>
        <div className="api-info">
          <span>Last call: </span>
          <span>{model.lastCallTokens || 0} tokens</span>
          <span>${(model.lastCallCost || 0).toFixed(4)}</span>
        </div>
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            onInputChange(model, e.target.value);
          }}
          placeholder="Type a message..."
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
