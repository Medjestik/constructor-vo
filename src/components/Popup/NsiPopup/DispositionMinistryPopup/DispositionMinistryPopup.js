import React from 'react';
import Popup from '../../Popup.js';
import PopupSelect from '../../PopupSelect/PopupSelect.js';

function DispositionMinistryPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading, ministries }) {

  const [addMinistry, setAddMinistry] = React.useState({});
  const [addMinistryValue, setAddMinistryValue] = React.useState(type === 'edit' ? nsi.nsiMinistry : 'placeholder');
  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addEdition, setAddEdition] = React.useState('');
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolNumberError, setAddProtocolNumberError] = React.useState(false);
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addProtocolDateError, setAddProtocolDateError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiMinistry: addMinistry.id, nsiName: addName, nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, nsiEdit: addEdition, type_id: id, nsiFullName: addFullName };
    onSave(newNsi, onClose);
  }

  function handleAddMinistry(item) {
    setAddMinistryValue(item);
    setAddMinistry(ministries.find((elem) => elem.id === item.id));
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
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

  function handleAddEdition(e) {
    setAddEdition(e.target.value);
  }

  React.useEffect(() => {
    setAddMinistryValue(type === 'edit' ? nsi.nsiMinistry : 'placeholder');
    setAddMinistry(type === 'edit' ? nsi : {});
    setAddName(nsi.nsiName);
    setAddEdition(nsi.nsiEdit || "");
    setAddProtocolNumber(nsi.nsiProtocolNumber);
    setAddProtocolDate(nsi.nsiProtocolDate);
    setAddFullName('');
    setAddNameError(false);
    setAddProtocolNumberError(false);
    setAddProtocolDateError(false)
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen, type]);

  React.useEffect(() => {
    if (
      addNameError || 
      addProtocolDateError ||
      addProtocolNumberError ||
      addName.length < 1 ||
      addProtocolDate.length < 10 ||
      addProtocolNumber.length < 1 ||
      addMinistryValue === "placeholder"
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addMinistry, addName, addProtocolDate, addProtocolNumber])

  React.useEffect(() => {
  let ministry = addMinistryValue === "placeholder" ? '<Министерство> ' : addMinistry.short_genitive
  let edition = addEdition.length > 0 ? " (ред. от " + printDate(addEdition) + " г.) " : "";
	let date = addProtocolDate.length > 0 ? printDate(addProtocolDate) : "xx.xx.xxxx"
	let number = addProtocolNumber.length > 0 ? addProtocolNumber : "XX"
  let name = addName.length > 0 ? addName: "<название>"
  setAddFullName("Распоряжение " + ministry + " от " + date + " г. № " + number + "" + edition + " «" + name + "»");

 // eslint-disable-next-line
  }, [addMinistry, addEdition, addProtocolDate, addProtocolNumber, addName])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >
          <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Распоряжения Министерства</h3>

          <div className="popup__field">
            <h5 className="popup__input-caption">Министерство</h5>
            <PopupSelect filterType={'byId'} options={ministries.map((elem) => ({...elem, name: elem.fullname }))} currentOption={addMinistryValue} onChooseOption={handleAddMinistry} />
          </div>

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
            <h5 className="popup__input-caption">Номер</h5>
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
            <span className={`popup__input-error ${addProtocolNumberError ? 'popup__input-error_status_show' : ''}`}>
              Заполните номер
            </span>
          </div>

          <div className="popup__field">
            <h5 className="popup__input-caption">Приказ от</h5>
            <input  
              className="popup__input"
              placeholder="введите дату приказа"
              type="date"
              id={`${type}-nsi-input-protocol-date-${id}`}
              name={`${type}-nsi-input-protocol-date-${id}`}
              autoComplete="off"
              value={addProtocolDate}
              onChange={handleAddProtocolDate}
              required
            >
            </input>
            <span className={`popup__input-error ${addProtocolDateError ? 'popup__input-error_status_show' : ''}`}>
              Заполните дату
            </span>
          </div>

          <div className="popup__field">
            <h5 className="popup__input-caption">Редакция (если есть)</h5>
            <input  
              className="popup__input"
              placeholder="введите редакцию"
              type="date"
              id={`${type}-nsi-input-edition-${id}`}
              name={`${type}-nsi-input-edition-${id}`}
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

export default DispositionMinistryPopup;