import React from 'react';
import Popup from '../../Popup.js';

function TechnicalRegulationPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [addApproveName, setAddApproveName] = React.useState('');
  const [addApproveNameError, setAddApproveNameError] = React.useState(false);
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolNumberError, setAddProtocolNumberError] = React.useState(false);
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addProtocolDateError, setAddProtocolDateError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiCode: addCode, nsiApproveName: addApproveName, nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, type_id: id, nsiFullName: addFullName };
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

  function handleAddCode(e) {
    setAddCode(e.target.value);
    if (e.target.checkValidity()) {
      setAddCodeError(false);
    } else {
      setAddCodeError(true);
    }
  }

  function handleAddApproveName(e) {
    setAddApproveName(e.target.value);
    if (e.target.checkValidity()) {
      setAddApproveNameError(false);
    } else {
      setAddApproveNameError(true);
    }
  }

  function handleAddProtocolNumber(e) {
    setAddProtocolNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddProtocolNumberError(false);
    } else {
      setAddProtocolNumberError(true);
    }
  }

  function handleAddProtocolDate(e) {
    setAddProtocolDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddProtocolDateError(true);
    } else {
      setAddProtocolDateError(false);
    }
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddCode(nsi.nsiCode);
    setAddApproveName(nsi.nsiApproveName);
    setAddProtocolNumber(nsi.nsiProtocolNumber);
    setAddProtocolDate(nsi.nsiProtocolDate);
    setAddFullName('');
    setAddNameError(false);
    setAddCodeError(false);
    setAddApproveNameError(false);
    setAddProtocolNumberError(false);
    setAddProtocolDateError(false)
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addCodeError || 
      addApproveNameError || 
      addProtocolDateError ||
      addProtocolNumberError ||
      addName.length < 1 ||
      addCode.length < 1 ||
      addApproveName.length < 1 ||
      addProtocolDate.length < 10 ||
      addProtocolNumber.length < 1 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addApproveName, addProtocolDate, addProtocolNumber])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName : "<наименование>"
    let code = addCode.length > 0 ? addCode : "<шифр>"
    let approve = addApproveName.length > 0 ? "(утв. " + addApproveName  : "(утв. <кем утвержден> "
	  let date = addProtocolDate.length > 0 ? printDate(addProtocolDate) : "xx.xx.xxxx"
	  let number = addProtocolNumber.length > 0 ? addProtocolNumber : "XX" 
    setAddFullName("Технический регламент таможенного союза ТР ТС " + code + " «" + name + "». " + approve + " от " + date + " г. № " + number + ")."); 
    
    // eslint-disable-next-line
    }, [addName, addCode, addApproveName, addProtocolDate, addProtocolNumber])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Технического регламента таможенного союза</h3>

      <div className="popup__field">
        <h5 className="popup__input-caption">Название</h5>
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
        <h5 className="popup__input-caption">Шифр</h5>
        <input 
          className="popup__input"
          placeholder="введите шифр"
          type="text"
          id={`${type}-nsi-input-code-${id}`}
          name={`${type}-nsi-input-code-${id}`}
          autoComplete="off"
          value={addCode}
          onChange={handleAddCode}
          required
        >
        </input>
        <span className={`popup__input-error ${addCodeError ? 'popup__input-error_status_show' : ''}`}>
          Заполните шифр
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Утвержденный</h5>
        <input 
          className="popup__input"
          placeholder="введите кем утвержден"
          type="text"
          id={`${type}-nsi-input-approve-name-${id}`}
          name={`${type}-nsi-input-approve-name-${id}`}
          autoComplete="off"
          value={addApproveName}
          onChange={handleAddApproveName}
          required
        >
        </input>
        <span className={`popup__input-error ${addApproveNameError ? 'popup__input-error_status_show' : ''}`}>
          Заполните кем утвержден
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Протокол №</h5>
        <input 
          className="popup__input"
          placeholder="введите номер"
          type="text"
          id={`${type}-nsi-input-approve-number-${id}`}
          name={`${type}-nsi-input-approve-number-${id}`}
          autoComplete="off"
          value={addProtocolNumber}
          onChange={handleAddProtocolNumber}
          required
        >
        </input>
        <span className={`popup__input-error ${addProtocolNumberError  ? 'popup__input-error_status_show' : ''}`}>
          Заполните номер
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Протокол от</h5>
        <input  
          className="popup__input"
          placeholder="введите редакцию"
          type="date"
          id={`${type}-nsi-input-protocol-date-${id}`}
          name={`${type}-nsi-input-protocol-date-${id}`}
          autoComplete="off"
          value={addProtocolDate}
          onChange={handleAddProtocolDate}
          required
        >
        </input>
        <span className={`popup__input-error ${addProtocolDateError  ? 'popup__input-error_status_show' : ''}`}>
          Заполните дату
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

export default TechnicalRegulationPopup;