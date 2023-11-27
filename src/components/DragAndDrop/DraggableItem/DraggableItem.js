import React from 'react';
import './DraggableItem.css';
import { Draggable } from 'react-beautiful-dnd';

function DraggableItem ({ part, index }) {

  return (
    <>
    <Draggable draggableId={part.stringIds} index={index}>
      {(provided, snapshot) => (
        <li key={part.stringIds} className={`draggable-item ${snapshot.isDragging ? 'draggable-item_type_dragging' : ''}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <span className='draggable-item__count'>{`${index + 1}.`}</span>
          <p className='draggable-item__text'>{part.name}</p>
        </li>
      )}
    </Draggable>
    </>
  )
}

export default DraggableItem;