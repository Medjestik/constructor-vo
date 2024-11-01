import React from 'react';
import Popup from '../../Popup.js';

function CatalogPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addPeriod, setAddPeriod] = React.useState('');
  const [addPeriodError, setAddPeriodError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiPeriod: addPeriod, nsiCode: addCode, type_id: id, nsiFullName: addFullName };
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
  }

  function handleAddPeriod(e) {
    setAddPeriod(e.target.value);
    if (e.target.checkValidity()) {
      setAddPeriodError(false);
    } else {
      setAddPeriodError(true);
    }
  }

  React.useEffect(() => {
    setAddPeriod(nsi.nsiPeriod);
    setAddName(nsi.nsiName);
    setAddCode(nsi.nsiCode || "");
    setAddFullName('');
    setAddNameError(false);
    setAddPeriodError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addPeriodError || 
      addPeriod.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addPeriod])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName: "<название>"
    let code = addCode.length > 0 ? ": " + addCode+" " : ""; 
    let period = addPeriod.length > 0 ?  addPeriod  : "<период>" 
    
    setAddFullName("Каталог " + name + " " + code + "" + period);

    // eslint-disable-next-line
  }, [addName,addCode, addPeriod])


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Каталога</h3>

      <div className="popup__field">
        <h5 className="popup__input-caption">Название</h5>
        <div className='popup__input-field'>
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
        </div>
        <span className={`popup__input-error ${addNameError ? 'popup__input-error_status_show' : ''}`}>
          Заполните название
        </span>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">Шифр (если есть)</h5>
        <div className='popup__input-field'>
          <input  
            className="popup__input"
            placeholder="введите шифр"
            type="text"
            id={`${type}-nsi-input-code-${id}`}
            name={`${type}-nsi-input-code-${id}`}
            autoComplete="off"
            value={addCode}
            onChange={handleAddCode}
          >
          </input>
        </div>
      </div>

      <div className="popup__field">
        <h5 className="popup__input-caption">За какой период</h5>
        <div className='popup__input-field'>
          <input 
            className="popup__input"
            placeholder="введите период"
            type="text"
            id={`${type}-nsi-input-period-${id}`}
            name={`${type}-nsi-input-period-${id}`}
            autoComplete="off"
            value={addPeriod}
            onChange={handleAddPeriod}
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addPeriodError ? 'popup__input-error_status_show' : ''}`}>
          Заполните период
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

export default CatalogPopup;