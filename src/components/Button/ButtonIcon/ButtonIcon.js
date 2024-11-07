import React from 'react';
import './ButtonIcon.css';
import { useNavigate } from "react-router-dom";

function ButtonIcon({ type = 'button', url = '/', onClick = {}, icon, color = 'white', isBlock = false }) {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (type === 'button') {
      onClick();
    } else {
      navigate(url);
    }
  }

  if (isBlock) {
    return (
      <div className={`btn-icon btn-icon_type_${icon} btn-icon_status_block`} ></div>
    )
  }

  return (
    <button 
      className={`btn-icon btn-icon_type_${icon} btn-icon_color_${color}`} 
      type='button' 
      onClick={handleButtonClick}
    >
    </button>
  )
}

export default ButtonIcon;
