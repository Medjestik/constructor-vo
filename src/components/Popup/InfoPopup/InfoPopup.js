import React from 'react';
import Popup from '../Popup.js';

function InfoPopup({ isOpen, onClose, title, text }) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={'info-popup'}
    >
      <h2 className='popup__title'>{title}</h2>
      <p className='popup__subtitle'>{text}</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-save' type='button' onClick={onClose}>Назад</button>
      </div>
    </Popup>
  )
}

export default InfoPopup;