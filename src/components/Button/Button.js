import React from 'react';
import './Button.css';

function Button({ type = 'button', width = 'default', color = 'default', text, onClick }) {
  return (
    <button 
      className={`button button_width_${width} button_color_${color}`} 
      onClick={onClick} 
      type={type}
    >
      {text || ''}
    </button>
  )
}

export default Button;
