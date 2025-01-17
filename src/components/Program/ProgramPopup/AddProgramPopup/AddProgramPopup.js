import React from 'react';
import Popup from '../../../Popup/Popup.js';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AddProgramPopup({ isOpen, onClose, directions, onAdd, isShowRequestError, isLoadingRequest }) {

  const typeOptions = [
    { name: 'Продукт', id: 1, },
    { name: 'Сфера деятельности', id: 2, },
  ]
  
  const formOptions = [
    { name: 'Выберите уровень образования...', id: 'placeholder', },
    { name: 'Очная', id: 'form-o', },
    { name: 'Очно-заочная', id: 'form-oz', },
    { name: 'Заочная', id: 'form-z', },
  ]
  
  const directionOptions = [
    { name: 'Выберите направление...', id: 'placeholder', },
    ...directions,
  ]

  const [currentDirection, setCurrentDirection] = React.useState({});
  const [currentForm, setCurrentForm] = React.useState({});
  const [currentType, setCurrentType] = React.useState(typeOptions[0]);

  const [semesterCount, setSemesterCount] = React.useState(0);
  const [semesterCountError, setSemesterCountError] = React.useState({ isShow: false, text: '' });

  const [profile, setProfile] = React.useState('');
  const [profileError, setProfileError] = React.useState({ isShow: false, text: '' });

  const [annotation, setAnnotation] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ 
      direction: currentDirection,
      profile: profile,
      form: currentForm.name,
      annotation: annotation,
      type: currentType.id,
      max_semesters: Number(semesterCount),
    })
  }

  function handleChangeProfile(e) {
    setProfile(e.target.value);
    if (e.target.checkValidity()) {
      setProfileError({ text: '', isShow: false });
    } else {
      setProfileError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeSemesterCount(e) {
    setSemesterCount(e.target.value);
    if (e.target.checkValidity()) {
      setSemesterCountError({ text: '', isShow: false });
    } else {
      setSemesterCountError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeDirection(option) {
    setCurrentDirection(option);
    calculateSemesterCount(option, currentForm);
  }
  
  function handleChangeForm(option) {
    setCurrentForm(option);
    calculateSemesterCount(currentDirection, option);
  }
  
  function calculateSemesterCount(direction, form) {
    console.log(direction, form);
    if (!direction || !form || direction.id === 'placeholder' || form.id === 'placeholder') {
      setSemesterCount(0);
      return;
    }
  
    const code = direction.code.split('.')[1];
    if (!code) {
      setSemesterCount(0);
      return;
    }
  
    const number = parseInt(code, 10);
    if (isNaN(number)) {
      setSemesterCount(0);
      return;
    }

    let count = 0;
    if (form.id === 'form-o') {
      // Очная форма
      if (number === 3) count = 8;
      else if (number === 4) count = 4;
      else if (number === 5) count = 10;
    } else if (form.id === 'form-oz') {
      // Очно-заочная форма
      if (number === 3) count = 9;
      else if (number === 4) count = 5;
      else if (number === 5) count = 11;
    } else if (form.id === 'form-z') {
      // Заочная форма
      if (number === 3) count = 10;
      else if (number === 4) count = 6;
      else if (number === 5) count = 12;
    }
  
    setSemesterCount(count);
  }

  function handleChangeType(option) {
    setCurrentType(option);
  }

  function handleChangeAnnotation(e) {
    setAnnotation(e.target.value);
  }

  React.useEffect(() => {
    if (
      currentDirection.id === 'placeholder'  || 
      profile.length < 1 || profileError.isShow || 
      currentForm.id === 'placeholder' ||
      semesterCount < 1 || semesterCount.isShow
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentDirection, profile, currentForm, semesterCount]);

  React.useEffect(() => {
    setCurrentForm(formOptions[0]);
    setProfile('');
    setProfileError({ isShow: false, text: '' });
    setCurrentDirection(directionOptions[0]);
    setAnnotation('');
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'add-program-popup'}
    >
      <h2 className='popup__title'>Создание новой программы</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Направление:</h4>
        <SelectSearch options={directionOptions} currentOption={currentDirection} onChooseOption={handleChangeDirection} />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Форма обучения:</h4>
        <PopupSelect options={formOptions} currentOption={currentForm} onChooseOption={handleChangeForm} />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Количество семестров:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='number'
          id='add-program-semester-count'
          value={semesterCount}
          onChange={handleChangeSemesterCount}
          name='add-program-semester-count' 
          placeholder='Введите количество семестров...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${semesterCountError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {semesterCountError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Профиль:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='add-program-profile'
          value={profile}
          onChange={handleChangeProfile}
          name='add-program-direction' 
          placeholder='Введите профиль...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${profileError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {profileError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Аннотация:</h4>
        <textarea 
        className='popup__textarea'
        type='text'
        id='add-program-annotation'
        value={annotation}
        onChange={handleChangeAnnotation}
        name='add-program-annotation' 
        placeholder='Введите аннотацию...'
        autoComplete='off'
        />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Тип программы:</h4>
        <PopupSelect options={typeOptions} currentOption={currentType} onChooseOption={handleChangeType} />
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

export default AddProgramPopup; 
