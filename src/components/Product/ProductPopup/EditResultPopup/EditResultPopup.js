import React from 'react';
import Popup from '../../../Popup/Popup.js';

function EditResultPopup({ isOpen, onClose, currentResult, onEdit, isShowRequestError, isLoadingRequest }) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });

  const [description, setDescription] = React.useState('');

  const [base, setBase] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onEdit({ ...currentResult, name: name, description: description, base: base });
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError({ text: '', isShow: false });
    } else {
      setNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeBase(e) {
    setBase(e.target.value);
  }

  React.useEffect(() => {
    if (name.length < 1 || nameError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [name]);

  React.useEffect(() => {
    setName(currentResult.name);
    setNameError({ isShow: false, text: '' });
    setDescription(currentResult.description);
    setBase(currentResult.base);
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'edit-result-popup'}
    >
      <h2 className='popup__title'>Редактирование результата</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Наименование:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='edit-result-name'
          value={name}
          onChange={handleChangeName}
          name='edit-result-name' 
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
        <h4 className='popup__input-caption'>Описание:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='edit-result-description'
          id='edit-result-description'
          placeholder='Введите описание..'            
          value={description}
          onChange={handleChangeDescription}
          required
        >
        </textarea>
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Обоснование:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='edit-result-base'
          id='edit-result-base'
          placeholder='Введите обоснование..'            
          value={base}
          onChange={handleChangeBase}
          required
        >
        </textarea>
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
  )
}

export default EditResultPopup; 
