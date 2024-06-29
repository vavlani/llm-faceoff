import React from 'react';

const CommonInput = ({ input, setInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="common-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message to send to all chat windows..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default CommonInput;
