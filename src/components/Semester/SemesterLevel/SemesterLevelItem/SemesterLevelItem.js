import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

function SemesterLevelItem({ columnIndex, item, index }) {
  
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div className='levels__item levels__item_type_dragging' 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            margin: "0 0 8px 0",
            minHeight: '50px',
            backgroundColor: snapshot.isDragging ? '#A6A6A6' : '',
            ...provided.draggableProps.style
          }}>
            <div className='levels__item-header'>
              <span className='badge badge_size_small badge_type_discipline'>Дисциплина</span>
                {
                  columnIndex !== 0 &&
                  <div className='levels__item-header-btn-container'>
                    <button className='icon icon_size_16 icon_type_time-grey' type='button'></button>
                    <button className='icon icon_size_16 icon_margin_left-8 icon_type_link-grey' type='button'></button>
                  </div>
                }
            </div>
            <p className='levels__item-title'>{item.name}</p>
          </div>
        );
      }}
    </Draggable>
  );
}

SemesterLevelItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object
};

export default React.memo(SemesterLevelItem);
