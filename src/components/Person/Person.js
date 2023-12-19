import React from 'react';
import './Person.css';
import Section from '../Section/Section.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Person({ onEditPerson, isLoadingRequest, isShowRequestError }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [firstName, setFirstName] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState({ isShow: false, text: '' });

  const [lastName, setLastName] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState({ isShow: false, text: '' });

  const [fatherName, setFatherName] = React.useState('');
  const [fatherNameError, setFatherNameError] = React.useState({ isShow: false, text: '' });
  
  const [mail, setMail] = React.useState('');
  const [mailError, setMailError] = React.useState({ isShow: false, text: '' });
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleEditPerson() {
    onEditPerson(firstName, lastName, fatherName, mail);
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

  React.useEffect(() => {
    if (
      firstName.length < 1 || firstNameError.isShow || 
      lastName.length < 1 || lastNameError.isShow || 
      fatherName.length < 1 || fatherNameError.isShow || 
      mail.length < 1 || mailError.isShow
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [firstName, lastName, fatherName, mail]);

  React.useEffect(() => {
    setFirstName(currentUser.first_name);
    setFirstNameError({ isShow: false, text: '' });
    setLastName(currentUser.last_name);
    setLastNameError({ isShow: false, text: '' });
    setFatherName(currentUser.middle_name);
    setFatherNameError({ isShow: false, text: '' });
    setMail(currentUser.email);
    setMailError({ isShow: false, text: '' });
  }, [currentUser]);

  return(
    <Section title='Личный кабинет' options={[]} heightType='page' headerType='large'>
      <div className='main'>
        <h1 className='main__title'>Данные пользователя</h1>

        <div className='person__container'>
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
        
            {
              isLoadingRequest ? 
              <button className='popup__btn-save popup__btn-save_margin-top popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
              :
              <button className={`popup__btn-save popup__btn-save_margin-top ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={handleEditPerson}>Сохранить</button>
            }

          <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
        </div>

      </div>
    </Section>
  )

}

export default Person;