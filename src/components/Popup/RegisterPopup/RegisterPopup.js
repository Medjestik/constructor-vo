import React from 'react';
import Popup from '../Popup.js';

function RegisterPopup({ isOpen, onClose, onRegister, isShowRequestError, isLoadingRequest }) {

  const [firstName, setFirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState({ isShow: false, text: '' });

  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState({ isShow: false, text: '' });

  const [fatherName, setFatherName] = React.useState('');
  const [fatherNameError, setFatherNameError] = React.useState({ isShow: false, text: '' });
  
  const [mail, setMail] = React.useState('');
  const [mailError, setMailError] = React.useState({ isShow: false, text: '' });
  
  const [newPassword, setNewPassword] = React.useState('');
  const [isShowNewPassword, setIsShowNewPassword] = React.useState(false);
  const [newPasswordError, setNewPasswordError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ 
      lastname: lastName,
      firstname: firstName,
      fathername: fatherName,
      email: mail,
      password: newPassword,
    })
  }

  function handleChangeFirstName(e) {
    setFirstName(e.target.value);
    if (e.target.checkValidity()) {
      setFirstNameError({ text: '', isShow: false });
    } else {
      setFirstNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeLastName(e) {
    setLastName(e.target.value);
    if (e.target.checkValidity()) {
      setLastNameError({ text: '', isShow: false });
    } else {
      setLastNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeFatherName(e) {
    setFatherName(e.target.value);
    if (e.target.checkValidity()) {
      setFatherNameError({ text: '', isShow: false });
    } else {
      setFatherNameError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeMail(e) {
    setMail(e.target.value);
    if (e.target.checkValidity()) {
      setMailError({ text: '', isShow: false });
    } else {
      setMailError({ text: 'Неправильный формат почты', isShow: true });
    }
  }

  function changeNewPassword(e) {
    setNewPassword(e.target.value);
    if (e.target.checkValidity()) {
      setNewPasswordError({ text: '', isShow: false });
    } else {
      setNewPasswordError({ text: 'Пароль должен содержать более 6 символов', isShow: true });
    }
  }

  React.useEffect(() => {
    if (
      firstName.length < 1 || firstNameError.isShow || 
      lastName.length < 1 || lastNameError.isShow || 
      fatherName.length < 1 || fatherNameError.isShow || 
      mail.length < 1 || mailError.isShow || 
      newPassword.length < 1 || newPasswordError.isShow
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [firstName, lastName, fatherName, mail, newPassword]);

  React.useEffect(() => {
    setFirstName('');
    setFirstNameError({ isShow: false, text: '' });
    setLastName('');
    setLastNameError({ isShow: false, text: '' });
    setFatherName('');
    setFatherNameError({ isShow: false, text: '' });
    setMail('');
    setMailError({ isShow: false, text: '' });
    setNewPassword('');
    setIsShowNewPassword(false);
    setNewPasswordError({ isShow: false, text: '' });
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'register-popup'}
    >
      <h2 className='popup__title'>Регистрация нового пользователя</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Фамилия:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='register-lastName'
          value={lastName}
          onChange={handleChangeLastName}
          name='register-lastName' 
          placeholder='Введите вашу фамилию...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${lastNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {lastNameError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Имя:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='register-firstName'
          value={firstName}
          onChange={handleChangeFirstName}
          name='register-firstName' 
          placeholder='Введите ваше имя...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${firstNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {firstNameError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Отчество:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id='register-fatherName'
          value={fatherName}
          onChange={handleChangeFatherName}
          name='register-lastName' 
          placeholder='Введите ваше отчество...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${fatherNameError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {fatherNameError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Электронная почта:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='email'
          id='register-mail'
          value={mail}
          onChange={handleChangeMail}
          name='register-mail' 
          placeholder='Укажите вашу почту...'
          autoComplete='off'
          required 
          />
        </div>
        <span className={`popup__input-error ${mailError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {mailError.text}
        </span>
      </label>
      
      <label className='popup__field'>
        <h4 className='popup__input-caption'>Пароль:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input popup__input_with_icon'
          type={isShowNewPassword ? 'text' : 'password'} 
          id='register-password'
          value={newPassword}
          onChange={changeNewPassword}
          name='register-password'
          placeholder='Введите ваш пароль'
          minLength='6'
          autoComplete='new-password'
          required 
          />
          <div 
          className={`popup__input-icon 
          ${isShowNewPassword ? 'popup__input-icon-password_type_hide' : 'popup__input-icon-password_type_show' } 
          `} 
          onClick={() => setIsShowNewPassword(!isShowNewPassword)}>
          </div>
        </div>
        <span className={`popup__input-error ${newPasswordError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {newPasswordError.text}
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

export default RegisterPopup; 