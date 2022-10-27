import React from 'react';
import Popup from '../Popup.js';

function ConfirmRemovePopup({ isOpen, onClose, onConfirm, item, isShowRequestError, isLoadingRequest }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(item);
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={'confirm-remove-popup'}
    >
      <h2 className='popup__title'>Запрос на удаление</h2>
      <p className='popup__subtitle'>Вы действительно хотите отправить запрос на&nbsp;удаление?</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Удаление..</button>
          :
          <button className='popup__btn-save' type='submit'>Удалить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default ConfirmRemovePopup;