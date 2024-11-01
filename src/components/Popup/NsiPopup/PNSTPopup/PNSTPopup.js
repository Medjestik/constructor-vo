import React from 'react';
import Popup from '../../Popup.js';

function PNSTPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [addLink, setAddLink] = React.useState('');
  const [addLinkError, setAddLinkError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiCode: addCode, nsiLink: addLink, type_id: id, nsiFullName: addFullName };
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

  function handleAddLink(e) {
    setAddLink(e.target.value);
    if (e.target.checkValidity()) {
      setAddLinkError(false);
    } else {
      setAddLinkError(true);
    }
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddCode(nsi.nsiCode);
    setAddLink(nsi.nsiLink);
    setAddFullName('');
    setAddNameError(false);
    setAddCodeError(false);
    setAddLinkError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addLinkError ||
      addLink.length < 1 ||
      addCodeError ||
      addCode.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addCode, addLink])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName : "<название>"
    let code = addCode.length > 0 ? addCode : "<шифр>"; 
    let link = addLink.length > 0 ? addLink : "<URL>"; 
    
    setAddFullName("ПНСТ " + code + ". Предварительный национальный стандарт РФ. " + name + ".– " + link);

  // eslint-disable-next-line
  }, [addName,addCode,addLink])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
      <h3 className="nsi-popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}ПНСТ</h3>

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
        <h5 className="popup__input-caption">Адрес сайта, URL</h5>
        <input  
          className="popup__input"
          placeholder="введите url"
          type="url"
          id={`${type}-nsi-input-link-${id}`}
          name={`${type}-nsi-input-link-${id}`}
          autoComplete="off"
          value={addLink}
          onChange={handleAddLink}
          required
        >
        </input>
        <span className={`popup__input-error ${addLinkError ? 'popup__input-error_status_show' : ''}`}>
          Введите корректный URL
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

export default PNSTPopup;