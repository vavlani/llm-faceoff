import React from 'react';

const LayoutControls = ({ layout, setLayout }) => {
  return (
    <div className="layout-controls">
      <button onClick={() => setLayout(2)} className={layout === 2 ? 'active' : ''}>2 Windows</button>
      <button onClick={() => setLayout(3)} className={layout === 3 ? 'active' : ''}>3 Windows</button>
    </div>
  );
};

export default LayoutControls;
