import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

const typeOptions = [
  { name: 'Продукт', id: 1, },
  { name: 'Сфера деятельности', id: 2, },
]

function EditProgramPopup({ isOpen, onClose, directions, onEdit, currentProgram, isShowRequestError, isLoadingRequest }) {

  const [currentDirection, setCurrentDirection] = React.useState({});
  const [currentForm, setCurrentForm] = React.useState({});
  const [currentType, setCurrentType] = React.useState(typeOptions.find((elem) => elem.id === currentProgram.type));

  const [profile, setProfile] = React.useState('');
  const [profileError, setProfileError] = React.useState({ isShow: false, text: '' });

  const [annotation, setAnnotation] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const formOptions = [
    { name: 'Очная', id: 'form-o', },
    { name: 'Очно-заочная', id: 'form-oz', },
    { name: 'Заочная', id: 'form-z', },
  ]

  function handleSubmit(e) {
    e.preventDefault();
    onEdit({ 
      direction: currentDirection,
      profile: profile,
      form: currentForm.name,
      annotation: annotation,
      id: currentProgram.id,
      type: currentType.id,
    })
  }

  function handleChangeForm(option) {
    setCurrentForm(option);
  }

  function handleChangeProfile(e) {
    setProfile(e.target.value);
    if (e.target.checkValidity()) {
      setProfileError({ text: '', isShow: false });
    } else {
      setProfileError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeDirection(option) {
    setCurrentDirection(option);
  }

  function handleChangeAnnotation(e) {
    setAnnotation(e.target.value);
  }

  React.useEffect(() => {
    if (
      currentDirection.id === 'placeholder'  || 
      profile.length < 1 || profileError.isShow || 
      currentForm.id === 'placeholder' 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentDirection, profile, currentForm]);

  React.useEffect(() => {
    setCurrentDirection(directions.find((elem) => elem.id === currentProgram.direction.id));
    setProfile(currentProgram.profile);
    setProfileError({ isShow: false, text: '' });
    setCurrentForm(formOptions.find((elem) => elem.name === currentProgram.form));
    setAnnotation(currentProgram.annotation || '');
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'edit-program-popup'}
    >
      <h2 className='popup__title'>Редактирование программы</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Направление:</h4>
        <PopupSelect options={directions} currentOption={currentDirection} onChooseOption={handleChangeDirection} />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Форма обучения:</h4>
        <PopupSelect options={formOptions} currentOption={currentForm} onChooseOption={handleChangeForm} />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Профиль:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='edit-program-profile'
          value={profile}
          onChange={handleChangeProfile}
          name='edit-program-direction' 
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
        id='edit-program-annotation'
        value={annotation}
        onChange={handleChangeAnnotation}
        name='edit-program-annotation' 
        placeholder='Введите аннотацию...'
        autoComplete='off'
        />
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

export default EditProgramPopup; 