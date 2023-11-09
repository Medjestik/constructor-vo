import React from 'react';
import './SelectSearch.css';

function SelectSearch() {

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  const options = [{id: 1, name: '123'}, {id: 2, name: '456'}, {id: 3, name: '111'}, {id: 4, name: '222'}, {id: 5, name: '333'}];

  const [filteredOptions, setFilteredOptions] = React.useState(options);

  const [currentOption, setCurrentOption] = React.useState(options[0]);
  const [searchText, setSearchText] = React.useState('');

  function handleChangeOption(option) {
    setCurrentOption(option);
    setIsOpenSelectOptions(false);
    setSearchText('');
    setFilteredOptions(options);
  }

  function handleChangeSearchText(e) {
    setSearchText(e.target.value);
    setFilteredOptions(options.filter(item => item.name.includes(e.target.value)));
  }

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`select-search ${isOpenSelectOptions ? 'select-search_status_open' : ''}`}>
      <div className='select-search__main' onClick={openSelectOptions}>
        {
          isOpenSelectOptions
          ?
          <input autoFocus value={searchText} placeholder={currentOption.name} onChange={handleChangeSearchText} className='popup__input'></input>
          :
          <p className={`select-search__text ${currentOption.id === 'placeholder' ? 'select-search__text_type_placeholder' : ''}`}>{currentOption.name}</p>
        }
        <div className={`select-search__arrow ${isOpenSelectOptions ? 'select-search__arrow_status_open' : ''}`}></div>
      </div>
      <div className={`select-search__options-container scroll ${isOpenSelectOptions ? 'select-search__options-container_status_open' : ''}`}>
        <ul className='select-search__options-list scroll'>
          {
            filteredOptions.filter(item => item.id !== currentOption.id && item.id !== 'placeholder').map((item, i) => (
              <li className='select-search__options-item' key={i} onClick={() => handleChangeOption(item)}>
                <p className='select-search__options-text'>{item.name}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default SelectSearch;