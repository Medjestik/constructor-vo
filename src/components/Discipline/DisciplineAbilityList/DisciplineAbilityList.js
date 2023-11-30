import React from 'react';
import LevelSearch from '../../Levels/LevelSearch/LevelSearch.js';

function DisciplineAbilityList({ data, disciplineList, abilityBase, isOpenDiscipline, onAdd, onDisconnect }) {

  const [filteredAbility, setFilteredAbility] = React.useState(abilityBase);
  const [isClearSearch, setIsClearSearch] = React.useState(false);

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);
  const [isShowList, setIsShowList] = React.useState(false);

  function findDisciplineName(disciplineId) {
    const findDiscipline = disciplineList.find((elem) => elem.id === disciplineId);
    return findDiscipline ? findDiscipline.name : '';
  }

  function handleClearSearch() {
    setIsClearSearch(false);
  }

  function handleSearchAbility(data) {
    setFilteredAbility(data);
  }

  React.useEffect(() => {
    setFilteredAbility(abilityBase);
    setIsClearSearch(true);
  // eslint-disable-next-line
  }, [abilityBase]);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
      setIsShowList(true);
    }
  // eslint-disable-next-line
  }, [data]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <div className='levels__container'>
      {
        isOpenDiscipline
        ?
        <>
        <div className='levels__header'>
          <h3 className='levels__header-title'>Умения дисциплины</h3>
          <div className='levels__header-btn-container'>
            <button className='icon icon_size_20 icon_type_add-grey' type='button' onClick={onAdd}></button>
          </div>
        </div>
        {
          data.length > 0
          ?
          <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
            { 
              isShowList &&
              data.map((item, i) => (
                <li className={`levels__item`} key={item.id}>
                  <div className='levels__item-header'>
                    <span className='badge badge_size_small badge_type_ability'>Умение</span>
                    <span className='badge badge_size_small badge_type_knowledge badge_margin_left_12'>Знаний: {item.knowledges.length}</span>
                    <div className='levels__item-header-btn-container'>
                      <button className='icon icon_size_16 icon_type_link-grey' type='button' onClick={(() => onDisconnect(item))}></button>
                    </div>
                  </div>
                  <p className='levels__item-title'>{item.name}</p>
                  <ul className='levels__children-list'>
                    {
                      item.knowledges.map((elem) => (
                        <li key={`children-${elem.id}`} className='levels__children-item levels__children-item_type_knowledge'></li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
          :
          <button className='badge badge_margin_top_20 badge_type_white badge-btn badge-btn_type_add' type='button' onClick={onAdd}>Добавить</button>
          }
        </>
        :
        <>
        <div className='levels__header'>
          <h3 className='levels__header-title'>Список умений</h3>
          <LevelSearch name='level-search-ability' data={abilityBase} onSearch={handleSearchAbility} isClearSearch={isClearSearch} onClear={handleClearSearch} />
        </div>
        {
          filteredAbility.length > 0
          ?
          <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
            { 
              isShowList &&
              filteredAbility.map((item, i) => (
                <li className={`levels__item`} key={item.id}>
                  <div className='levels__item-header'>
                    <span className='badge badge_size_small badge_type_ability'>Умение</span>
                    <span className='badge badge_size_small badge_type_knowledge badge_margin_left_12'>Знаний: {item.knowledges.length}</span>
                    <div className='levels__item-header-btn-container'>
                      {/*<button className='icon icon_size_16 icon_type_unlock-grey' type='button'></button>*/}
                    </div>
                  </div>
                  <p className='levels__item-title'>{item.name}</p>
                  <ul className='badge__list'>
                  {
                    item.discipline_id.length > 0
                    ?
                    item.discipline_id.map((disciplineId) => (
                      <li key={disciplineId} className='badge badge_size_small badge_type_discipline badge_margin_top_12 badge_margin_right_8'>
                        {findDisciplineName(disciplineId)}
                      </li>
                    ))
                    :
                    <li key={'empty'} className='badge badge_size_small badge_type_warning badge_margin_top_12'>Умение без дисциплины</li>
                  }
                  </ul>
                </li>
              ))
            }
          </ul>
          :
          <span className='levels__item-empty'>Список умений пуст</span>
          }
        </>
      }
    </div>
  )
}

export default DisciplineAbilityList; 