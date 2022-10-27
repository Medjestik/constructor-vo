import React from 'react';
import Popup from '../Popup.js';
import DragAndDrop from '../../DragAndDrop/DragAndDrop.js';

function ChangeOrderPopup({ isOpen, onClose, onConfirm, data, isShowRequestError, isLoadingRequest }) {

  const [order, setOrder] = React.useState([]);

  function handleChangeOrder(order) {
    setOrder(order);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(order);
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'change-order-popup'}
    >
      <h2 className='popup__title'>Изменение порядка элементов</h2>
      <p className='popup__subtitle'>Расположите элементы в правильном порядке перетаскивая их</p>
      
      <DragAndDrop data={data} onChangeOrder={handleChangeOrder} />

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className='popup__btn-save' type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default ChangeOrderPopup; 