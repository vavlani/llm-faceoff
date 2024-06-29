import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Select from 'react-select';
import './App.css';

const ChatWindow = ({ name, initialMessage, onRemove, webAccess, toggleWebAccess, onSendMessage }) => {
  const [messages, setMessages] = useState([{ text: initialMessage, sender: 'ai' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
        <h3>{name}</h3>
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
        </div>
      </div>
      <div className="chat-messages">
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
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const App = () => {
  const [layout, setLayout] = useState(3);
  const [selectedModels, setSelectedModels] = useState(['ChatGPT', 'Claude']);
  const [input, setInput] = useState('');

  const allModels = [
    { value: 'ChatGPT', label: 'ChatGPT', initialMessage: "In this example, both the `Dog` and `Cat` classes inherit from the `Animal` class and override the `speak` method with their own implementations. When calling `speak` on an instance of `Dog` or `Cat`, the appropriate implementation is invoked based on the actual type of the object." },
    { value: 'Claude', label: 'Claude', initialMessage: "Here's an example of operator overloading in Python:\n\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n\np1 = Point(1, 2)\np2 = Point(3, 4)\n\np3 = p1 + p2  # Overloading the + operator\nprint(p3.x, p3.y)  # Output: 4 6\n```" },
    { value: 'Gemini', label: 'Gemini', initialMessage: "Here's an example of polymorphism in Python:\n\n```python\nclass Animal:\n    def make_sound(self):\n        pass\n\nclass Dog(Animal):\n    def make_sound(self):\n        print('Woof!')\n\nclass Cat(Animal):\n    def make_sound(self):\n        print('Meow!')\n\nanimals = [Dog(), Cat()]\nfor animal in animals:\n    animal.make_sound()  # Calls the overridden method based on the object's class\n```" },
    { value: 'Bing Copilot', label: 'Bing Copilot', initialMessage: "Hello! How can I assist you today? 😊" },
    { value: 'Perplexity', label: 'Perplexity', initialMessage: "Here's an example of the Template Method pattern in Python:\n\n```python\nclass Animal:\n    def speak(self):\n        raise NotImplementedError('Subclass must implement this method')\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof!'\n\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow!'\n\n# Create a list of Animal objects\nanimals = [Dog(), Cat()]\n\n# Call the speak method on each object\nfor animal in animals:\n    print(animal.speak())\n```" },
    { value: 'Llama 2', label: 'Llama 2', initialMessage: "In object-oriented programming, the `speak` method is often used as an example of polymorphism. The `Dog` and `Cat` classes, which inherit from `Mammal`, override the `speak` method with their own specific sounds. When we create instances of `Dog` and `Cat` and call the `speak` method on each instance, the correct sound is produced for each animal." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      const aiResponse = { text: `You said: ${input}`, sender: 'ai' };
      // Update messages for all selected models
      setSelectedModels(prevModels => prevModels.map(model => ({
        ...model,
        messages: [...(model.messages || []), newMessage, aiResponse]
      })));
      setInput('');
    }
  };

  const removeWindow = (modelName) => {
    setSelectedModels(prevModels => prevModels.filter(model => model !== modelName));
  };

  const toggleWebAccess = (modelName) => {
    setSelectedModels(prevModels => prevModels.map(model => 
      model === modelName ? {...model, webAccess: !model.webAccess} : model
    ));
  };

  const sendMessage = (modelName, message) => {
    const newMessage = { text: message, sender: 'user' };
    const aiResponse = { text: `You said: ${message}`, sender: 'ai' };
    setSelectedModels(prevModels => prevModels.map(model => 
      model === modelName ? {...model, messages: [...(model.messages || []), newMessage, aiResponse]} : model
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
            name={model}
            initialMessage={allModels.find(m => m.value === model).initialMessage}
            onRemove={() => removeWindow(model)}
            webAccess={model.webAccess || false}
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
          value={selectedModels.map(model => allModels.find(m => m.value === model))}
          onChange={(selected) => setSelectedModels(selected.map(option => option.value))}
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