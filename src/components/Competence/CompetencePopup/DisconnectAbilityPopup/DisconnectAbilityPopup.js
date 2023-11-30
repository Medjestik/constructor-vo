import React from 'react';
import Popup from '../../../Popup/Popup.js';

function DisconnectAbilityPopup({ isOpen, onClose, onConfirm, currentAbility, isShowRequestError, isLoadingRequest }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(currentAbility.id);
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={'disconnect-ability-popup'}
    >
      <h2 className='popup__title'>Открепление умения</h2>
      <p className='popup__subtitle'>Вы действительно хотите открепить умение?</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Открепление..</button>
          :
          <button className='popup__btn-save' type='submit'>Открепить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default DisconnectAbilityPopup;