import React from 'react';

function CompetenceKnowledgeLevel({ openProcess, openAbility, onAdd, onEdit, onRemove, onConnect, onDisconnect, onInfo }) {

  function handleEdit(event, item) {
    event.stopPropagation();
    onEdit(item);
  }

  function handleDisconnect(event, item) {
    event.stopPropagation();
    onDisconnect(item);
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
  }, [openAbility]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <div className='levels__container'>
      <div className='levels__header'>
        <h3 className='levels__header-title'>Знания</h3>
        <div className='levels__header-info' onClick={() => onInfo('Знание', 'Описание знания..')}></div>
        <div className='levels__header-btn-container'>
          <button className='icon icon_size_20 icon_type_add-grey' type='button' onClick={onAdd}></button>
          <button className='icon icon_margin_left-8 icon_size_20 icon_type_link-grey' type='button'onClick={onConnect}></button>
          <button className='icon icon_margin_left-8 icon_size_20 icon_type_shuffle-grey' type='button'></button>
        </div>
      </div>
      {
        openAbility.knowledges.length > 0
        ?
        <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
          {
            isShowList &&
            openAbility.knowledges.map((item, i) => (
              <li className={`levels__item`} key={item.id}>
                <div className='levels__item-header'>
                  <span className='badge badge_size_small badge_type_knowledge'>Знание {openProcess.code}.{openAbility.code}.{i + 1}</span>
                  {
                     item.parent_id.length > 1 &&
                     <span className='badge badge_size_small badge_type_orange badge_margin_left_12'>Сквозное знание<div className='badge__arrows'></div></span>
                  }
                  <div className='levels__item-header-btn-container'>
                    <button className='icon icon_size_16 icon_type_edit-grey' type='button' onClick={(e) => handleEdit(e, item)}></button>
                    <button className='icon icon_margin_left-8 icon_size_16 icon_type_link-grey' type='button' onClick={(e) => handleDisconnect(e, item)}></button>
                    <button className='icon icon_margin_left-8 icon_size_16 icon_type_remove-grey' type='button' onClick={(e) => handleRemove(e, item)}></button>
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
    </div>
  )
}

export default CompetenceKnowledgeLevel;