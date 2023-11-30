import React from 'react';
import './ProductList.css';

function ProductList({ data, openProduct, onAdd, onOpen, onEdit, onRemove }) {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);
  const [isShowList, setIsShowList] = React.useState(false);

  function handleEditProduct(event, item) {
    event.stopPropagation();
    onEdit(item);
  }

  function handleRemoveProduct(event, item) {
    event.stopPropagation();
    onRemove(item);
  }

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
        <h3 className='levels__header-title'>Продукты</h3>
        <div className='levels__header-btn-container'>
          <button className='icon icon_size_20 icon_type_add-grey' type='button' onClick={onAdd}></button>
          <button className='icon icon_margin_left-8 icon_size_20 icon_type_shuffle-grey' type='button'></button>
        </div>
      </div>
      {
        data.length > 0
        ?
        <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
          {
            data.map((item, i) => (
              <li className={`levels__item ${openProduct.id === item.id && 'levels__item_type_active'}`} key={item.id} onClick={(() => onOpen(item, i + 1))}>
                <div className='levels__item-header'>
                  <span className='badge badge_size_small badge_type_product'>Продукт {i + 1}</span>
                  <span className='badge badge_size_small badge_type_stage badge_margin_left_12'>Этапы: {item.stages.length}</span>
                  <div className='levels__item-header-btn-container'>
                    {/*<button className='icon icon_size_16 icon_type_unlock-grey' type='button'></button>*/}
                    <button className='icon icon_margin_left-8 icon_size_16 icon_type_edit-grey' type='button' onClick={(e) => handleEditProduct(e, item)}></button>
                    <button className='icon icon_margin_left-8 icon_size_16 icon_type_remove-grey' type='button' onClick={(e) => handleRemoveProduct(e, item)}></button>
                  </div>
                </div>
                <p className='levels__item-title'>{item.name}</p>
                <ul className='levels__children-list'>
                  {
                    item.stages.map((elem) => (
                      <li key={`children-${elem.id}`} className='levels__children-item levels__children-item_type_stage'></li>
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

export default ProductList; 