import React from 'react';
import '../Login/Login.css';
import '../Popup/Popup.css';
import { useLocation } from 'react-router-dom';

function UpdatePassword({ onUpdate, isShowRequestError, isLoadingRequest }) {

  const { pathname } = useLocation();

  const [login, setLogin] = React.useState('');
  const [loginError, setLoginError] = React.useState({ isShow: false, text: '' });
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleChangeLogin(e) {
    setLogin(e.target.value);
    if (e.target.checkValidity()) {
      setLoginError({ text: '', isShow: false });
    } else {
      setLoginError({ text: 'Пароль должен содержать более 6 символов', isShow: true });
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (e.target.value === login) {
      setPasswordError({ text: '', isShow: false });
    } else {
      setPasswordError({ text: 'Пароли не совпадают', isShow: true });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const parts = pathname.split('/');
    const token = parts[parts.length - 1];
    const uid = parts[parts.length - 2];
    onUpdate(login, password, uid, token);
  }

  React.useEffect(() => {
    if (login.length < 1 || password.length < 1 || loginError.isShow || passwordError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [login, password]);

  React.useEffect(() => {
    setLogin('');
    setLoginError({ text: '', isShow: false });
    setPassword('');
    setPasswordError({ text: '', isShow: false });
  }, []);

  return (
    <div className='login'>
      <form className='login__form' name='login-form' action='#' noValidate onSubmit={handleSubmit}>
        <h1 className='login__title'>Восстановление пароля</h1>
        <label className='popup__field'>
          <h4 className='popup__input-caption'>Введите новый пароль:</h4>

          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='reset-password-new'
            value={login}
            onChange={handleChangeLogin}
            name='reset-password-new' 
            placeholder='Введите новый пароль...' 
            minLength='6'
            required 
            />
          </div>
          <span className={`popup__input-error ${loginError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {loginError.text}
          </span>
        </label>

        <label className='popup__field'>
          <h4 className='popup__input-caption'>Повторите пароль:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='reset-password-repeat'
            value={password}
            onChange={handleChangePassword}
            name='reset-password-repeat' 
            placeholder='Повторите пароль...' 
            minLength='6'
            required 
            />
          </div>
          <span className={`popup__input-error ${passwordError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {passwordError.text}
          </span>
        </label>

        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_margin-top popup__btn-save_type_loading' disabled type='button'>Обновление..</button>
          :
          <button className={`popup__btn-save popup__btn-save_margin-top ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Обновить</button>
        }

        <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>

      </form>
    </div>
  );
}

export default UpdatePassword;