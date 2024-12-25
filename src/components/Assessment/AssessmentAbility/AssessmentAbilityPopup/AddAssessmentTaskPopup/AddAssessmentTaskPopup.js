import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function AddAssessmentTaskPopup({ isOpen, onClose, onAdd, currentAbilityId, isShowRequestError, isLoadingRequest }) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });

  const [description, setDescription] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name: name, description: description, abilityId: currentAbilityId, });
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

  React.useEffect(() => {
    if (name.length < 1 || nameError.isShow || currentAbilityId === 'placeholder') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [name]);

  React.useEffect(() => {
    setName('');
    setNameError({ isShow: false, text: '' });
    setDescription('');
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'add-task-popup'}
    >
      <h2 className='popup__title'>Добавление задания</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Наименование:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='add-task-name'
          value={name}
          onChange={handleChangeName}
          name='add-task-name' 
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
          name='add-task-description'
          id='add-task-description'
          placeholder='Введите описание..'            
          value={description}
          onChange={handleChangeDescription}
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

export default AddAssessmentTaskPopup; 
