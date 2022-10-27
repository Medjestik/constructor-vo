import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AddParticipantPopup({ isOpen, onClose, users, roles, onAdd, isShowRequestError, isLoadingRequest }) {

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentRole, setCurrentRole] = React.useState({});

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const userOptions = [
    { name: 'Выберите участника...', id: 'placeholder', },
    ...users,
  ]

  const roleOptions = [
    { name: 'Выберите роль...', id: 'placeholder', },
    ...roles,
  ]

  function handleSubmit(e) {
    e.preventDefault();
    const participant = { user_id: currentUser.id, role_id: currentRole.id, }
    onAdd(participant);
  }

  function handleChangeUser(option) {
    setCurrentUser(option);
  }

  function handleChangeRole(option) {
    setCurrentRole(option);
  }

  React.useEffect(() => {
    if (currentUser.id === 'placeholder' || currentRole.id === 'placeholder') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentUser, currentRole]);

  React.useEffect(() => {
    setCurrentUser(userOptions[0]);
    setCurrentRole(roleOptions[0]);
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'add-participant-popup'}
    >
      <h2 className='popup__title'>Добавление нового участника</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Участник:</h4>
        <PopupSelect options={userOptions} currentOption={currentUser} onChooseOption={handleChangeUser} />
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Роль:</h4>
        <PopupSelect options={roleOptions} currentOption={currentRole} onChooseOption={handleChangeRole} />
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

export default AddParticipantPopup;