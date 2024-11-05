import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function CreateNewQuestionPopup({ isOpen, onClose, onCreate, questionTypes }) {

  const [currentQuestionType, setCurrentQuestionType] = React.useState({ id: 'empty', name: 'Выберите тип вопроса..' })

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onCreate({ text: name, type: currentQuestionType });
  }

  function handleChangeQuestionType(type) {
    setCurrentQuestionType(type);
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
    if (name.length < 1 || nameError.isShow || currentQuestionType.id === 'empty') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [name, currentQuestionType]);

  React.useEffect(() => {
    setName('');
    setNameError({ isShow: false, text: '' });
    setCurrentQuestionType({ id: 'empty', name: 'Выберите тип вопроса..' });
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'create-question-popup'}
    >
      <h2 className='popup__title'>Создание нового вопроса</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Тип вопроса:</h4>
        <PopupSelect options={questionTypes} currentOption={currentQuestionType} onChooseOption={handleChangeQuestionType} />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Текст вопроса:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='create-question-name'
          value={name}
          onChange={handleChangeName}
          name='create-question-name' 
          placeholder='Введите наименование...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${nameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {nameError.text}
        </span>
      </label>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
      </div>
    </Popup>
  )
}

export default CreateNewQuestionPopup;
