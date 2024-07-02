import React, { useEffect } from 'react';
import { FaPaperPlane, FaCopy, FaShareSquare } from 'react-icons/fa';

const CommonInput = ({ input, setInput, handleSubmit, handleCopy, handleSendIndividual }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'c':
            e.preventDefault();
            handleCopy();
            break;
          case 'i':
            e.preventDefault();
            handleSendIndividual();
            break;
          case 'Enter':
            e.preventDefault();
            handleSubmit(e);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCopy, handleSendIndividual, handleSubmit]);

  return (
    <form onSubmit={handleSubmit} className="common-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message to send to all chat windows..."
      />
      <button 
        type="button" 
        className="copy-button" 
        onClick={handleCopy} 
        title="Copy to all inputs (Ctrl+C / Cmd+C)" 
        style={{backgroundColor: '#d2b48c'}}
      >
        <FaCopy />
      </button>
      <button 
        type="button" 
        className="send-individual-button" 
        onClick={handleSendIndividual} 
        title="Send from individual inputs (Ctrl+I / Cmd+I)" 
        style={{backgroundColor: '#d2b48c'}}
      >
        <FaShareSquare />
      </button>
      <button 
        type="submit" 
        className="send-button" 
        title="Send to all chat windows (Ctrl+Enter / Cmd+Enter)" 
        style={{backgroundColor: '#8B4513'}}
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default CommonInput;
