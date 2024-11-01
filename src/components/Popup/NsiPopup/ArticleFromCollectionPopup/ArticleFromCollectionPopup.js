import React from 'react';
import Popup from '../../Popup.js';

function ArticleFromCollection({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addLink, setAddLink] = React.useState('');
  const [addLinkError, setAddLinkError] = React.useState(false);
  const [addAuthors, setAddAuthors] = React.useState('');
  const [addAuthorsError, setAddAuthorsError] = React.useState(false);
  const [addEditor, setAddEditor] = React.useState('');
  const [addEditorError, setAddEditorError] = React.useState(false);
  const [addYear, setAddYear] = React.useState('');
  const [addYearError, setAddYearError] = React.useState(false);
  const [addCity, setAddCity] = React.useState('');
  const [addCityError, setAddCityError] = React.useState(false);
  const [addPages, setAddPages] = React.useState('');
  const [addPagesError, setAddPagesError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiLink: addLink, nsiAuthors: addAuthors, nsiCity: addCity, nsiEditor: addEditor, nsiYear: addYear, nsiPages: addPages, type_id: id, nsiFullName: addFullName };
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

  function handleAddLink(e) {
    setAddLink(e.target.value);
    if (e.target.checkValidity()) {
      setAddLinkError(false);
    } else {
      setAddLinkError(true);
    }
  }

  function handleAddAuthors(e) {
    setAddAuthors(e.target.value);
    if (e.target.checkValidity()) {
      setAddAuthorsError(false);
    } else {
      setAddAuthorsError(true);
    }
  }

  function handleAddEditor(e) {
    setAddEditor(e.target.value);
    if (e.target.checkValidity()) {
      setAddEditorError(false);
    } else {
      setAddEditorError(true);
    }
  }

  function handleAddCity(e) {
    setAddCity(e.target.value);
    if (e.target.checkValidity()) {
      setAddCityError(false);
    } else {
      setAddCityError(true);
    }
  }

  function handleAddYear(e) {
    setAddYear(e.target.value);
    if (e.target.checkValidity()) {
      setAddYearError(false);
    } else {
      setAddYearError(true);
    }
  }

  function handleAddPages(e) {
    setAddPages(e.target.value);
    if (e.target.checkValidity()) {
      setAddPagesError(false);
    } else {
      setAddPagesError(true);
    }
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddLink(nsi.nsiLink);
    setAddAuthors(nsi.nsiAuthors);
    setAddEditor(nsi.nsiEditor);
    setAddCity(nsi.nsiCity);
    setAddYear(nsi.nsiYear);
    setAddPages(nsi.nsiPages);
    setAddFullName('');
    setAddNameError(false);
    setAddLinkError(false);
    setAddAuthorsError(false);
    setAddEditorError(false);
    setAddCityError(false);
    setAddYearError(false);
    setAddPagesError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addLinkError || 
      addLink.length < 1 ||
      addAuthorsError ||
      addAuthors.length < 1 ||
      addEditorError || 
      addEditor.length < 1 ||
      addCityError ||
      addCity.length < 1 ||
      addYearError ||
      addYear.length < 1 ||
      addPagesError || 
      addPages.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addAuthors, addEditor, addYear, addPages, addLink, addCity]);

  React.useEffect(() => {
    let name = addName.length > 0 ? addName : "<наименование>"
    let link = addLink.length > 0 ? addLink + "." : "<сборник>"
    let authors = addAuthors.length > 0 ? addAuthors : "<Фамилия И.О. авторов>"
    let city = addCity.length > 0 ? "— " + addCity + ":" : "<город>"
    let editor = addEditor.length > 0 ? addEditor : ": <журнал>"
    let year = addYear.length > 0 ? addYear : "<год>"
    let pages = addPages.length > 0 ? "— С. " + addPages + "." : "<страницы>"
    setAddFullName(authors + " " + name + " // " + link + " " + city + " " + editor + ", " + year + ". " + pages);
  // eslint-disable-next-line
  }, [addName, addAuthors, addEditor, addYear, addPages, addLink, addCity]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`${type}-nsi-form-${id}`}
      onSubmit={handleSubmit}
    >

      <h3 className="popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}статьи из сборника</h3>

      <li className="popup__field"> 
        <h5 className="popup__input-caption">Авторы</h5>
        <div className='popup__input-field'>
          <input  
            className="popup__input"
            placeholder="введите фамилию и инициалы авторов"
            type="text"
            id={`${type}-nsi-input-authors-${id}`}
            name={`${type}-nsi-input-authors-${id}`}
            autoComplete="off"
            value={addAuthors}
            onChange={handleAddAuthors}
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addAuthorsError ? 'popup__input-error_status_show' : ''}`}>
          Заполните фамилию и инициалы авторов
        </span>
      </li>

      <li className="popup__field">
        <h5 className="popup__input-caption">Название статьи</h5>
        <div className='popup__input-field'>
          <input 
            className="popup__input"
            placeholder="введите название статьи"
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
          Заполните название статьи
        </span>
      </li>

      <li className="popup__field">
        <h5 className="popup__input-caption">Название сборника</h5>
        <div className='popup__input-field'>
          <input 
            className="popup__input"
            placeholder="введите название сборника"
            type="text"
            id={`${type}-nsi-input-link-${id}`}
            name={`${type}-nsi-input-link-${id}`}
            autoComplete="off"
            value={addLink}
            onChange={handleAddLink}
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addLinkError ? 'popup__input-error_status_show' : ''}`}>
          Заполните название сборника
        </span>
      </li>

      <li className="popup__field">
        <h5 className="popup__input-caption">Город издательства</h5>
        <div className='popup__input-field'>
          <input  
            className="popup__input"
            placeholder="введите город издательства"
            type="text"
            id={`${type}-nsi-input-city-${id}`}
            name={`${type}-nsi-input-city-${id}`}
            autoComplete="off"
            value={addCity}
            onChange={handleAddCity}
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addCityError ? 'popup__input-error_status_show' : ''}`}>
          Заполните город издательства
        </span>
      </li>

      <li className="popup__field">
        <h5 className="popup__input-caption">Название издательства</h5>
        <div className='popup__input-field'>
          <input  
            className="popup__input"
            placeholder="введите название издательства"
            type="text"
            id={`${type}-nsi-input-editor-${id}`}
            name={`${type}-nsi-input-editor-${id}`}
            autoComplete="off"
            value={addEditor}
            onChange={handleAddEditor}
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addEditorError ? 'popup__input-error_status_show' : ''}`}>
          Заполните название издательства
        </span>
      </li>

      <li className="popup__field">
        <h5 className="popup__input-caption">Год издания</h5>
        <div className='popup__input-field'>
          <input  
            className="popup__input"
            placeholder="введите год издания"
            type="number"
            id={`${type}-nsi-input-year-${id}`}
            name={`${type}-nsi-input-year-${id}`}
            autoComplete="off"
            value={addYear}
            onChange={handleAddYear}
            onWheel={(e) => e.target.blur()}
            min="1900"
            max="2099"
            step="1"
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addYearError ? 'popup__input-error_status_show' : ''}`}>
          Заполните год издания
        </span>
      </li>

      <li className="popup__field">
        <h5 className="popup__input-caption">Страницы статьи в сборнике</h5>
        <div className='popup__input-field'>
          <input  
            className="popup__input"
            placeholder="Пример: 25-30"
            type="text"
            id={`${type}-nsi-input-pages-${id}`}
            name={`${type}-nsi-input-pages-${id}`}
            autoComplete="off"
            value={addPages}
            onChange={handleAddPages}
            required
          >
          </input>
        </div>
        <span className={`popup__input-error ${addPagesError ? 'popup__input-error_status_show' : ''}`}>
          Заполните cтраницы статьи
        </span>
      </li>

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

export default ArticleFromCollection;