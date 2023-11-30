import React from 'react';
import './LevelSearch.css';

function LevelSearch({ name, data, onSearch, isClearSearch, onClear }) {

  const [searchText, setSearchText] = React.useState('');

  function handleSearchText(e) {
    setSearchText(e.target.value);
  }

  React.useEffect(() => {
    isClearSearch && onClear();
    setSearchText('');
    // eslint-disable-next-line
  }, [isClearSearch]);

  React.useEffect(() => {
    if (data.length > 0) {
      const changeData = data.filter((item) => {
       return item.name.toLowerCase().includes(searchText.toLowerCase());
      })
      onSearch(changeData);
    }
  // eslint-disable-next-line
  }, [searchText]);

  return (
    <div className={`level__search`}> 
      <input
      className='level__search-input'
      placeholder='Поиск..'
      type='text'
      id={name}
      name={name}
      autoComplete='disabled'
      value={searchText}
      onChange={handleSearchText}
      >
      </input>
    </div>
  );
}

export default LevelSearch; 