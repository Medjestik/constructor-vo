import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function EditParticipantPopup({ isOpen, onClose, currentParticipant, roles, onEdit, isShowRequestError, isLoadingRequest }) {

  const [currentRole, setCurrentRole] = React.useState({});

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const participant = { user_id: currentParticipant.user.id, role_id: currentRole.id, }
    onEdit(participant);
  }

  function handleChangeRole(option) {
    setCurrentRole(option);
  }

  React.useEffect(() => {
    if (currentRole.id === 'placeholder') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentRole]);

  React.useEffect(() => {
    setCurrentRole(roles.find((elem) => elem.id === currentParticipant.role.id));
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'edit-participant-popup'}
    >
      <h2 className='popup__title'>Редактирование участника</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Участник:</h4>
        <div className='popup__input-field'>
          <div className='popup__input'>{currentParticipant.user.name}</div>
        </div>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Роль:</h4>
        <PopupSelect options={roles} currentOption={currentRole} onChooseOption={handleChangeRole} />
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

export default EditParticipantPopup;