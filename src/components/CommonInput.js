import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const CommonInput = ({ input, setInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="common-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message to send to all chat windows..."
      />
      <button type="submit" className="send-button">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default CommonInput;
