import React from 'react';
import './Alert.css';

function Alert({ type, text, onClose }) {

  return (
    <div className={`alert alert_type_${type}`}>
      <div className='alert__icon'></div>
      <div className='alert__information'>
        <h3 className='alert__title'>{type === 'warning' ? 'Предупреждение' : 'Сообщение'}</h3>
        <p className='alert__text'>{text}</p>
      </div>
      <button className='alert__btn-close' type='button' onClick={onClose}></button>
    </div>
  )
}

export default Alert;
