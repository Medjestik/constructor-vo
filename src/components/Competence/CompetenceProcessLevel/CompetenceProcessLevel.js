import React from 'react';

function CompetenceProcessLevel({ data, openProcess, onOpen }) {

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
    <div  className='levels__container'>
      <div className='levels__header'>
        <h3 className='levels__header-title'>Процессы</h3>
      </div>
      {
        data.length > 0
        &&
        <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='levels__list scroll-inside'>
          { 
            isShowList &&
            data.map((item, i) => (
              <li className={`levels__item levels__item_type_open ${openProcess.id === item.id ? 'levels__item_type_active' : ''}`} key={item.id} onClick={(() => onOpen(item, i + 1))}>
                <div className='levels__item-header'>
                  <span className='badge badge_size_small badge_type_process'>Процесс {i + 1}</span>
                  <span className='badge badge_size_small badge_type_ability badge_margin_left_12'>Умений: {item.abilities.length}</span>
                  <div className='levels__item-header-btn-container'>
                  </div>
                </div>
                <p className='levels__item-title'>{item.name}</p>
                <p className='levels__item-subtitle'>{item.product.name} | {item.stage.name}</p>
                <ul className='levels__children-list'>
                  {
                    item.abilities.map((elem) => (
                      <li key={`children-${elem.id}`} className='levels__children-item levels__children-item_type_ability'></li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
        </ul>
      }
    </div>
  )
}

export default CompetenceProcessLevel; 