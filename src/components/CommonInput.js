import React from 'react';
import { FaPaperPlane, FaCopy, FaPlay } from 'react-icons/fa';

const CommonInput = ({ input, setInput, handleSubmit, handleCopy, handleSendIndividual }) => {
  return (
    <form onSubmit={handleSubmit} className="common-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message to send to all chat windows..."
      />
      <button type="button" className="copy-button" onClick={handleCopy} title="Copy to all inputs">
        <FaCopy />
      </button>
      <button type="button" className="send-individual-button" onClick={handleSendIndividual} title="Send from individual inputs">
        <FaPlay />
      </button>
      <button type="submit" className="send-button" title="Send to all chat windows">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default CommonInput;
