import React from 'react';
import { FaPaperPlane, FaCopy, FaShareSquare } from 'react-icons/fa';

const CommonInput = ({ input, setInput, handleSubmit, handleCopy, handleSendIndividual }) => {
  return (
    <form onSubmit={handleSubmit} className="common-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message to send to all chat windows..."
      />
      <button type="button" className="copy-button" onClick={handleCopy} title="Copy to all inputs" style={{backgroundColor: '#d2b48c'}}>
        <FaCopy />
      </button>
      <button type="button" className="send-individual-button" onClick={handleSendIndividual} title="Send from individual inputs" style={{backgroundColor: '#d2b48c'}}>
        <FaShareSquare />
      </button>
      <button type="submit" className="send-button" title="Send to all chat windows" style={{backgroundColor: '#8B4513'}}>
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default CommonInput;
