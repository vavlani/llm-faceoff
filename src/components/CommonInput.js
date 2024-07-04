import React, { useEffect } from 'react';
import { FaCopy, FaShareSquare } from 'react-icons/fa';

const CommonInput = ({ input, setInput, handleCopy, handleSendIndividual }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'x') {
        e.preventDefault();
        handleCopy();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        handleSendIndividual();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCopy, handleSendIndividual]);

  return (
    <div className="common-input">
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
        title="Copy to all inputs (Ctrl+Shift+X or Cmd+Shift+X)"
      >
        <FaCopy />
      </button>
      <button 
        type="button" 
        className="send-individual-button" 
        onClick={handleSendIndividual} 
        title="Send from individual inputs (Ctrl+I / Cmd+I)"
      >
        <FaShareSquare />
      </button>
    </div>
  );
};

export default CommonInput;
