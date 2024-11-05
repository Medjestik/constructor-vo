import React from 'react';

import './Levels.css';

function Levels({ direction, children }) {
  return (
    <div className={`levels levels_direction_${direction}`}>
      {children}
    </div>
  )
}

export default Levels;