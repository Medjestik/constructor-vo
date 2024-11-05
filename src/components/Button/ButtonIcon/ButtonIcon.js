import React from 'react';
import './ButtonIcon.css';
import { useNavigate } from "react-router-dom";

function ButtonIcon({ type = 'button', url = '/', onClick = {}, icon, color = 'white' }) {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (type === 'button') {
      onClick();
    } else {
      navigate(url);
    }
  }

  return (
    <button className={`btn-icon btn-icon_color_${color}`} type='button' onClick={handleButtonClick}> 
      <div className={`btn-icon__img btn-icon__img_type_${icon}`}></div>
    </button>
  )
}

export default ButtonIcon;
