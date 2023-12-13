import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import SemesterLevelItem from '../SemesterLevelItem/SemesterLevelItem.js';

const SemesterLevelColumn = ({ droppableId, column, columnIndex }) => {

  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`semester__column-main ${columnIndex === 0 ? 'semester__column-main_type_initial' : ''}`}
            style={{
              background: snapshot.isDraggingOver ? '#D9D9D9' : '',
              height: '320px',
            }}
          >
            <ul className='semester__column-list scroll-inside'
            style={{
              minHeight: '288px',
            }}>
              {column?.disciplines?.map((item, index) => {
                return <SemesterLevelItem key={item.id} columnIndex={columnIndex} item={item} index={index} />;
              })}
            </ul>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

SemesterLevelColumn.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string
};

export default React.memo(SemesterLevelColumn); 