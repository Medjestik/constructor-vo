import React from 'react';
import Popup from '../../../Popup/Popup.js';

function AddDisciplinePopup({ isOpen, onClose, onAdd, currentProcess, isShowRequestError, isLoadingRequest }) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name: name, process_id: currentProcess.id });
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError({ text: '', isShow: false });
    } else {
      setNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
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
    setName('');
    setNameError({ isShow: false, text: '' });
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'add-discipline-popup'}
    >
      <h2 className='popup__title'>Добавление дисциплины</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Наименование дисциплины:</h4>
        <textarea 
          className='popup__textarea scroll'
          name='add-discipline-name'
          id='add-discipline-name'
          placeholder='Введите наименование..'            
          value={name}
          onChange={handleChangeName}
          autoComplete='off'
          minLength={1}
          required 
        >
        </textarea>
        <span className={`popup__input-error ${nameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {nameError.text}
        </span>
      </label>

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

export default AddDisciplinePopup; 