import React from 'react';
import Popup from '../../../../components/Popup/Popup.js';

function ConstructDisciplinePopup({ isOpen, onClose, onConfirm, item, isShowRequestError, isLoadingRequest }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(item);
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={'construct-discipline-popup'}
    >
      <h2 className='popup__title'>Проектирование дисциплин</h2>
      <p className='popup__subtitle'>Вы действительно хотите сформировать дисциплины из процессов автоматически?</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Формирование..</button>
          :
          <button className='popup__btn-save' type='submit'>Сформировать</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default ConstructDisciplinePopup;
 