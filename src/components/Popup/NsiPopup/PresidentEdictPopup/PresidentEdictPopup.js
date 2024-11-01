import React from 'react';
import Popup from '../../Popup.js';

function PresidentEdictPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addDate, setAddDate] = React.useState('');
  const [addDateError, setAddDateError] = React.useState(false);
  const [addNumber, setAddNumber] = React.useState('');
  const [addNumberError, setAddNumberError] = React.useState(false);
  const [addEdition, setAddEdition] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiDate: addDate, nsiNumber: addNumber, nsiEdit: addEdition, type_id: id, nsiFullName: addFullName };
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

  function handleAddEdition(e) {
    setAddEdition(e.target.value);
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddDate(nsi.nsiDate);
    setAddNumber(nsi.nsiNumber);
    setAddEdition(nsi.nsiEdit || "");
    setAddFullName('');
    setAddNameError(false);
    setAddDateError(false);
    setAddNumberError(false)
    setIsBlockSubmitButton(true);
  }, [type, nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addDateError ||
      addNumberError ||
      addName.length < 1 ||
      addDate.length < 10 ||
      addNumber.length < 1 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addDate, addNumber])

  React.useEffect(() => {  
    let edition = addEdition.length > 0 ? "(ред. от " + printDate(addEdition) + ")" : "";  
    let number = addNumber.length > 0 ? addNumber : "xxx"  
    let date = addDate.length > 0 ? printDate(addDate) : "xx.xx.xxxx";  
    let name = addName.length > 0 ? addName : "Название";

    setAddFullName("Указ Президента Российской Федерации от " + date + " г. № " + number + " " + edition + " «" + name + "»");

   // eslint-disable-next-line
  }, [addName, addDate, addNumber, addEdition]) 
  
  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Указа Президента РФ</h3>

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
        <h5 className="popup__input-caption">Датированный</h5>
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
        <h5 className="popup__input-caption">Номер</h5>
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

      <div className="popup__field">
        <h5 className="popup__input-caption">Редакция (если есть)</h5>
        <input  
          className="popup__input"
          placeholder="введите редакцию"
          type="date"
          id={`${type}-nsi-input-edition-date-${id}`}
          name={`${type}-nsi-input-edition-date-${id}`}
          autoComplete="off"
          value={addEdition}
          onChange={handleAddEdition}
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

export default PresidentEdictPopup;