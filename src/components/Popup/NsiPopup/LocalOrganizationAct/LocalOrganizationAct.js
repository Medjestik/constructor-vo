import React from 'react';
import Popup from '../../Popup.js';

function LocalOrganizationAct({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addOrganization, setAddOrganization] = React.useState('');
  const [addOrganizationError, setAddOrganizationError] = React.useState(false);
  const [addDate, setAddDate] = React.useState('');
  const [addDateError, setAddDateError] = React.useState(false);
  const [addNumber, setAddNumber] = React.useState('');
  const [addNumberError, setAddNumberError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiAuthors: addOrganization, nsiDate: addDate, nsiNumber: addNumber, type_id: id, nsiFullName: addFullName };
    onSave(newNsi, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddOrganization(e) {
    setAddOrganization(e.target.value);
    if (e.target.checkValidity()) {
      setAddOrganizationError(false);
    } else {
      setAddOrganizationError(true);
    }
  }

  function handleAddNumber(e) {
    setAddNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddNumberError(false);
    } else {
      setAddNumberError(true);
    }
  }

  function handleAddDate(e) {
    setAddDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddDateError(true);
    } else {
      setAddDateError(false);
    }
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddOrganization(nsi.nsiAuthors);
    setAddDate(nsi.nsiDate);
    setAddNumber(nsi.nsiNumber);
    setAddFullName('');
    setAddNameError(false);
    setAddOrganizationError(false);
    setAddDateError(false);
    setAddNumberError(false)
    setIsBlockSubmitButton(true);
  }, [type, nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addOrganizationError ||
      addDateError ||
      addNumberError ||
      addName.length < 1 ||
      addOrganization.length < 1 ||
      addDate.length < 10 ||
      addNumber.length < 1 
      ) {
      setIsBlockSubmitButton(true); 
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addOrganization, addDate, addNumber])

  React.useEffect(() => {
    let number = addNumber.length > 0 ? addNumber : "xxx"
    let organization = addOrganization.length > 0 ? addOrganization : "<Организация>"
    let date = addDate.length > 0 ? printDate(addDate) : "xx.xx.xxxx";
    let name = addName.length > 0 ? addName : "<Название>"
    
    setAddFullName(name + " " + organization + " от " + date + " г. №" + number);
    // eslint-disable-next-line
  }, [addName, addOrganization, addDate, addNumber])


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}локального акта организации</h3>

      <div className="popup__field">
        <h5 className="popup__input-caption">Наименование организации</h5>
        <input 
        className="popup__input"
        placeholder="введите наименование организации"
        type="text"
        id={`${type}-nsi-input-organization-${id}`}
        name={`${type}-nsi-input-organization-${id}`}
        autoComplete="off"
        value={addOrganization}
        onChange={handleAddOrganization}
        required
        >
        </input>
        <span className={`popup__input-error ${addOrganizationError ? 'popup__input-error_status_show' : ''}`}>
          Заполните наименование организации
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Название акта</h5>
        <input 
        className="popup__input"
        placeholder="введите название"
        type="text"
        id={`${type}-nsi-input-name-${id}`}
        name={`${type}-nsi-input-name-${id}`}
        autoComplete="off"
        value={addName}
        onChange={handleAddName}
        required
        >
        </input>
        <span className={`popup__input-error ${addNameError ? 'popup__input-error_status_show' : ''}`}>
          Заполните название
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Дата утверждения акта</h5>
        <input  
        className="popup__input"
        placeholder="введите дату"
        type="date"
        id={`${type}-nsi-input-date-${id}`}
        name={`${type}-nsi-input-date-${id}`}
        autoComplete="off"
        value={addDate}
        onChange={handleAddDate}
        required
        >
        </input>
        <span className={`popup__input-error ${addDateError ? 'popup__input-error_status_show' : ''}`}>
          Заполните дату
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Номер утверждения акта</h5>
        <input 
        className="popup__input"
        placeholder="введите номер"
        type="text"
        id={`${type}-nsi-input-number-${id}`}
        name={`${type}-nsi-input-number-${id}`}
        autoComplete="off"
        value={addNumber}
        onChange={handleAddNumber}
        required
        >
        </input>
        <span className={`popup__input-error ${addNumberError ? 'popup__input-error_status_show' : ''}`}>
          Заполните номер
        </span>
      </div>

      <p className="popup__text nsi-popup__result-name ">
        <span className="popup__text popup__text-accent">Итоговое название: </span>
        {addFullName}
      </p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          type === "edit" ?
          <button 
          className={`popup__btn-save ${isBlockSubmitButton ? "popup__btn-save_type_block" : ""} ${isLoading ? "popup__btn-save_type_loading" : ""}`} 
          type="submit"
          >
            {isLoading ? "Сохранение.." : "Сохранить"}
          </button>
          :
          <button 
          className={`popup__btn-save ${isBlockSubmitButton ? "popup__btn-save_type_block" : ""} ${isLoading ? "popup__btn-save_type_loading" : ""}`} 
          type="submit"
          >
            {isLoading ? "Добавление.." : "Добавить"}
          </button>
        }
      </div>

    </Popup>
  )
}

export default LocalOrganizationAct;