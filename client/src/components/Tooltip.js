import React from 'react';
import './Tooltip.css';

const Tooltip = ({ message, visible, position }) => {
  console.log(`Rendering Tooltip: visible=${visible}, message=${message}`);
  return (
    <div className={`tooltip ${visible ? 'visible' : ''}`} style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      {message}
    </div>
  );
};

export default Tooltip;
