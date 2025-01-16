import React from 'react';
import Popup from '../../../Popup/Popup.js';
import Nsi from '../../../Nsi/Nsi.js';

function EditProductPopup({ isOpen, onClose, currentProduct, currentProgramType, nsi: nsiList, onEdit, onOpenNsi, onEditNsi, onRemoveNsi, isShowRequestError, isLoadingRequest }) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });

  // Инициализация массива выбранных NSI
  const [nsi, setNsi] = React.useState([]);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onEdit({ ...currentProduct, name, nsis: nsi });
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError({ text: '', isShow: false });
    } else {
      setNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleToggleNsi(selectedNsi) {
    setNsi((prevState) => {
      if (prevState.includes(selectedNsi.id)) {
        return prevState.filter((id) => id !== selectedNsi.id); // Удаляем, если уже существует
      } else {
        return [...prevState, selectedNsi.id]; // Добавляем, если не существует
      }
    });
  }

  React.useEffect(() => {
    if (name.length < 1 || nameError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  }, [name, nameError]);

  React.useEffect(() => {
    setName(currentProduct.name); // Устанавливаем имя из текущего продукта
    setNsi(currentProduct.nsis.map((elem) => elem.id)); // Устанавливаем выбранные NSI
    setNameError({ isShow: false, text: '' });
  }, [currentProduct, isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'edit-product-popup'}
    >
      <h2 className='popup__title'>Редактирование {currentProgramType === 2 ? 'сферы' : 'продукта'}</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Наименование {currentProgramType === 2 ? 'сферы' : 'продукта'}:</h4>
        <div className='popup__input-field'>
          <input 
            className='popup__input'
            type='text'
            id='edit-program-product'
            value={name}
            onChange={handleChangeName}
            name='edit-program-product' 
            placeholder='Введите наименование...'
            autoComplete='off'
            minLength={1}
            required 
          />
        </div>
        <span className={`popup__input-error ${nameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {nameError.text}
        </span>
      </div>

      <div className='popup__field'>
        <Nsi nsi={nsiList} selectedNsi={nsi} onToggleNsi={handleToggleNsi} onOpenNsi={onOpenNsi} onEditNsi={onEditNsi} onRemoveNsi={onRemoveNsi} />
      </div>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  );
}

export default EditProductPopup;
