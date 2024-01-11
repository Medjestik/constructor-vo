import React from 'react';

function DisciplineLevel({ data, openDiscipline, onOpen, onClose, onAdd, onEdit, onRemove }) {

  function handleEdit(event, item) {
    event.stopPropagation();
    onEdit(item);
  }

  function handleRemove(event, item) {
    event.stopPropagation();
    onRemove(item);
  }

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);
  const [isShowList, setIsShowList] = React.useState(false);

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
      <div className='levels__header'>
        <h3 className='levels__header-title'>Дисциплины</h3>
        <div className='levels__header-btn-container'>
          <button className='icon icon_size_20 icon_type_add-grey' type='button' onClick={onAdd}></button>
          <button className='icon icon_margin_left-8 icon_size_20 icon_type_open-grey' type='button' onClick={onClose}></button>
        </div>
      </div>
      {
        data.length > 0
        ?
        <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
          { 
            isShowList &&
            data.map((item, i) => (
              <li className={`levels__item levels__item_type_open ${openDiscipline.id === item.id ? 'levels__item_type_active' : ''}`} key={item.id} onClick={(() => onOpen(item))}>
                <div className='levels__item-header'>
                  <span className='badge badge_size_small badge_type_discipline'>Дисциплина</span>
                  <div className='levels__item-header-btn-container'>
                    <button className='icon icon_size_16 icon_type_edit-grey' type='button' onClick={(e) => handleEdit(e, item)}></button>
                    <button className='icon icon_size_16 icon_type_remove-grey icon_margin_left-8' type='button' onClick={(e) => handleRemove(e, item)}></button>
                  </div>
                </div>
                <p className='levels__item-title'>{item.name}</p>
                <ul className='badge__list'>
                  <span className='badge badge_size_small badge_type_ability badge_margin_top_12 badge_margin_right_8'>Ум. {item.abilities.length}</span>
                  <span className='badge badge_size_small badge_type_knowledge badge_margin_top_12 badge_margin_right_8'>Зн. {item.knowledges.length}</span>
                </ul>
              </li>
            ))
          }
        </ul>
        :
        <button className='badge badge_margin_top_20 badge_type_white badge-btn badge-btn_type_add' type='button' onClick={onAdd}>Добавить</button>
      }
    </div>
  )
}

export default DisciplineLevel; 