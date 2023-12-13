import React from 'react';
import LevelSearch from '../../Levels/LevelSearch/LevelSearch.js';

function DisciplineKnowledgeLevel({ data, disciplineList, knowledgeBase, isOpenDiscipline, onAdd, onDisconnect }) {

  const [filteredKnowledge, setFilteredKnowledge] = React.useState(knowledgeBase);
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

  function handleSearchKnowledge(data) {
    setFilteredKnowledge(data);
  }

  React.useEffect(() => {
    setFilteredKnowledge(knowledgeBase);
    setIsClearSearch(true);
  // eslint-disable-next-line
  }, [knowledgeBase]);

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
    <div  className='levels__container'>
      {
        isOpenDiscipline
        ?
        <>
        <div className='levels__header'>
          <h3 className='levels__header-title'>Знания дисциплины</h3>
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
                    <span className='badge badge_size_small badge_type_knowledge'>Знание</span>
                    <div className='levels__item-header-btn-container'>
                      <button className='icon icon_size_16 icon_type_link-grey' type='button' onClick={(() => onDisconnect(item))}></button>
                    </div>
                  </div>
                  <p className='levels__item-title'>{item.name}</p>
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
          <h3 className='levels__header-title'>Список знаний</h3>
          <LevelSearch name='level-search-knowledge' data={knowledgeBase} onSearch={handleSearchKnowledge} isClearSearch={isClearSearch} onClear={handleClearSearch} />
        </div>
        {
          filteredKnowledge.length > 0
          ?
          <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
            { 
              isShowList &&
              filteredKnowledge.map((item, i) => (
                <li className={`levels__item`} key={item.id}>
                  <div className='levels__item-header'>
                    <span className='badge badge_size_small badge_type_knowledge'>Знание</span>
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
                    <li key={'empty'} className='badge badge_size_small badge_type_warning badge_margin_top_12'>Знание без дисциплины</li>
                  }
                  </ul>
                </li>
              ))
            }
          </ul>
          :
          <span className='levels__item-empty'>Список знаний пуст</span>
        }
        </>
      }
    </div>
  )
}

export default DisciplineKnowledgeLevel; 