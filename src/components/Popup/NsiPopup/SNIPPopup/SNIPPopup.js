import React from 'react';
import Popup from '../../Popup.js';

function SNIPPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiBasis: "", nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, nsiCode: addCode, type_id: id, nsiFullName: addFullName };
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

  function handleAddProtocolNumber(e) {
    setAddProtocolNumber(e.target.value);
  }

  function handleAddProtocolDate(e) {
    setAddProtocolDate(e.target.value);
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddCode(nsi.nsiCode);
    setAddProtocolNumber(nsi.nsiProtocolNumber || "");
    setAddProtocolDate(nsi.nsiProtocolDate || "");
    setAddFullName('');
    setAddNameError(false);
    setAddCodeError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addCodeError ||
      addCode.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addCode])

  React.useEffect(() => { 
    let code = addCode.length > 0 ? addCode : "<шифр>" 
    let name = addName.length > 0 ? addName : "<название>"
    let number = addProtocolNumber.length > 0 ? addProtocolNumber : ""
    let date = addProtocolDate.length > 0 ? printDate(addProtocolDate) : ""
    let res = addProtocolNumber.length > 0 ? "Утвержден постановлением Госстроя России от " + date + " г. № " + number : ""
    setAddFullName("СНиП "+ code + ". «" + name + "». " + res);

  // eslint-disable-next-line
  }, [addCode, addName, addProtocolNumber, addProtocolDate])


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Строительных норм и правил</h3>

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
        <h5 className="popup__input-caption">Номер Постановления (если есть)</h5>
        <input 
          className="popup__input"
          placeholder="введите номер"
          type="text"
          id={`${type}-nsi-protocol-number-${id}`}
          name={`${type}-nsi-protocol-number-${id}`}
          autoComplete="off"
          value={addProtocolNumber}
          onChange={handleAddProtocolNumber}
        >
        </input>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Дата Постановления (если есть)</h5>
        <input  
          className="popup__input"
          placeholder="введите редакцию"
          type="date"
          id={`${type}-nsi-protocol-date-${id}`}
          name={`${type}-nsi-protocol-date-${id}`}
          autoComplete="off"
          value={addProtocolDate}
          onChange={handleAddProtocolDate}
        >
        </input>
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

export default SNIPPopup;