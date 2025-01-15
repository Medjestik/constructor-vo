import React from 'react';

function ProductStageLevel({ data, currentProgramType, isOpenStages, openProduct, openStage, onAdd, onOpen, onEdit, onRemove, onInfo }) {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  function handleEditStage(event, item) {
    event.stopPropagation();
    onEdit(item);
  }

  function handleRemoveStage(event, item) {
    event.stopPropagation();
    onRemove(item);
  }

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);
    }
  // eslint-disable-next-line
  }, [data]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <>
    {
      isOpenStages 
      ?
      <div className='levels__container'>
        <div className='levels__header'>
          <h3 className='levels__header-title'>{currentProgramType === 2 ? 'Области' : 'Этапы ЖЦ'}</h3>
          <div className='levels__header-info' onClick={() => onInfo('Этап', 'Описание этапа..')}></div>
          <div className='levels__header-btn-container'>
            <button className='icon icon_size_20 icon_type_add-grey' type='button' onClick={onAdd}></button>
          </div>
        </div>
        {
          data.length > 0
          ?
          <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
            {
              data.map((item, i) => (
                <li 
                className={`levels__item levels__item_type_open ${openStage.id === item.id && 'levels__item_type_active'}`} 
                key={item.id} 
                onClick={(() => onOpen(item, i + 1))}
                >
                  <div className='levels__item-header'>
                    <span className='badge badge_size_small badge_type_stage'>{currentProgramType === 2 ? 'Область' : 'Этап'} {openProduct.code}.{i + 1}</span>
                    <div className='levels__item-header-btn-container'>
                      <button className='icon icon_margin_left-8 icon_size_16 icon_type_edit-grey' type='button' onClick={(e) => handleEditStage(e, item)}></button>
                      <button className='icon icon_margin_left-8 icon_size_16 icon_type_remove-grey' type='button' onClick={(e) => handleRemoveStage(e, item)}></button>
                    </div>
                  </div>
                  <p className='levels__item-title'>{item.name}</p>
                  <ul className='levels__children-list'>
                    {
                      item.processes.map((elem) => (
                        <li key={`children-${elem.id}`} className='levels__children-item levels__children-item_type_process'></li>
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
      :
      <div className='levels__container'>
        <div className='levels__header'>
          <h3 className='levels__header-title'>{currentProgramType === 2 ? 'Области' : 'Этапы ЖЦ'}</h3>
          <div className='levels__header-info' onClick={() => onInfo('Этап', 'Описание этапа..')}></div>
        </div>
        <p className='levels__item-empty'>Выберите {currentProgramType === 2 ? 'сферу..' : 'продукт..'}</p>
      </div>
    }
    </>
  )
}

export default ProductStageLevel;
