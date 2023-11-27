import React from 'react';

function CompetenceAbilityList({ openProcess, openAbility, onAdd, onOpen, onEdit, onRemove, onConnect, onDisconnect }) {

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
  }, [openProcess]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <div className='levels__container'>
      <div className='levels__header'>
        <h3 className='levels__header-title'>Умения</h3>
        <div className='levels__header-btn-container'>
          <button className='icon icon_size_20 icon_type_add-grey' type='button' onClick={onAdd}></button>
          <button className='icon icon_margin_left-8 icon_size_20 icon_type_link-grey' type='button'onClick={onConnect}></button>
          <button className='icon icon_margin_left-8 icon_size_20 icon_type_shuffle-grey' type='button'></button>
        </div>
      </div>
      {
        openProcess.abilities.length > 0
        ?
        <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
          {
            isShowList &&
            openProcess.abilities.map((item, i) => (
              <li className={`levels__item ${openAbility.id === item.id ? 'levels__item_type_active' : ''}`} key={item.id} onClick={(() => onOpen(item, i + 1))}>
                <div className='levels__item-header'>
                  <span className='badge badge_size_small badge_type_green'>Умение {openProcess.code}.{i + 1}</span>
                  <span className='badge badge_size_small badge_type_blue badge_margin_left_12'>Знания: {item.knowledges.length}</span>
                  <div className='levels__item-header-btn-container'>
                    <button className='icon icon_size_16 icon_type_edit-grey' type='button' onClick={(e) => handleEdit(e, item)}></button>
                    <button className='icon icon_margin_left-8 icon_size_16 icon_type_link-grey' type='button' onClick={(e) => handleDisconnect(e, item)}></button>
                    <button className='icon icon_margin_left-8 icon_size_16 icon_type_remove-grey' type='button' onClick={(e) => handleRemove(e, item)}></button>
                  </div>
                </div>
                <p className='levels__item-title'>{item.name}</p>
                <ul className='levels__children-list'>
                  {
                    item.knowledges.map((elem) => (
                      <li key={`children-${elem.id}`} className='levels__children-item'></li>
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
    </div>
  )
}

export default CompetenceAbilityList;