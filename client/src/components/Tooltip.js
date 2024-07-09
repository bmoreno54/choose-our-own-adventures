import React from 'react';
import './Tooltip.css';

const Tooltip = ({ message, visible, position }) => {
  return (
    <div className={`tooltip ${visible ? 'visible' : ''}`} style={position}>
      {message}
    </div>
  );
};

export default Tooltip;
