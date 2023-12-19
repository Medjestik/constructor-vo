import React from 'react';
import Popup from '../Popup.js';

function ResetPasswordPopup({ isOpen, onClose, onResetPassword, isShowRequestError, isLoadingRequest }) {

  const [mail, setMail] = React.useState('');
  const [mailError, setMailError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  

  function handleSubmit(e) {
    e.preventDefault();
    onResetPassword(mail);
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
      mail.length < 1 || mailError.isShow
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [mail]);

  React.useEffect(() => {
    setMail('');
    setMailError({ isShow: false, text: '' });
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={'confirm-remove-popup'}
    >
      <h2 className='popup__title'>Запрос на сброс пароля</h2>
      <p className='popup__subtitle'>Введите адрес электронной почты для отправки письма на почту.</p>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Электронная почта:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='email'
          id='reset-password-mail'
          value={mail}
          onChange={handleChangeMail}
          name='reset-password-mail' 
          placeholder='Укажите вашу почту...'
          autoComplete='off'
          required 
          />
        </div>
        <span className={`popup__input-error ${mailError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {mailError.text}
        </span>
      </label>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Отправление..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Отправить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default ResetPasswordPopup;