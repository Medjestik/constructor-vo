import React from 'react';
import * as semesterApi from '../../../utils/semesterApi.js';
import Preloader from '../../Preloader/Preloader.js';
import { DragDropContext } from 'react-beautiful-dnd';
import SemesterLevelColumn from './SemesterLevelColumn/SemesterLevelColumn.js';

function SemesterLevel({ currentProgram }) {

  const [disciplines, setDisciplines] = React.useState([]);
  const [semesters, setSemesters] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  console.log(columns);

  function getDisciplines() {
    const token = localStorage.getItem('token');
    Promise.all([
      semesterApi.getShortDisciplines({ token: token, programId: currentProgram.id }),
      semesterApi.getSemesters({ token: token, programId: currentProgram.id }),
    ])
      .then(([disc, sem]) => {
        console.log('DisciplineSemester:', disc);
        console.log('Semesters:', sem);
        setDisciplines(disc);
        setSemesters(sem);
        setColumns([{id: 'based', disciplines: disc.filter((elem) => elem.semesters.length === 0)}, ...sem]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

	const onDragEnd = (result, columns, setColumns) => {
    const token = localStorage.getItem('token');
		if (!result.destination) return;
		const { source, destination } = result;
		if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
      if (sourceColumn.id === 'based') {
        semesterApi.attachDiscipline({ token: token, semesterId: destColumn.id, disciplineId: result.draggableId})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      if (destColumn.id === 'based') {
        semesterApi.detachDiscipline({ token: token, semesterId: sourceColumn.id, disciplineId: result.draggableId})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      if ((sourceColumn.id !== 'based') && (destColumn.id !== 'based')) {
        semesterApi.moveDiscipline({ token: token, sourceId: sourceColumn.id, destinationId: destColumn.id, disciplineId: result.draggableId})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      const sourceItems = [...sourceColumn.disciplines];
      const destItems = [...destColumn.disciplines];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {...sourceColumn, disciplines: sourceItems},
        [destination.droppableId]: {...destColumn, disciplines: destItems}
      });
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.disciplines];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {...column, disciplines: copiedItems}
			});
		}
	};

  React.useEffect(() => {
    getDisciplines();
    return(() => {
      setDisciplines([]);
      setSemesters([]);
      setColumns([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    isLoadingPage
    ?
    <Preloader />
    :
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <div className='semester__container'>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
          <div className='semester__column' key={columnId}>
            <div className='semester__header'>
              {
                index === 0 
                ?
                <h5 className='semester__header-title'>Дисциплины для распределения ({column.disciplines.length} шт.)</h5>
                :
                <h5 className='semester__header-title'>Семестер {column.number} ({column.disciplines.length} шт.)</h5>
              }
              {
                index !== 0 &&
                <div className='semester__header-btn-container'>
                  <button className='icon icon_size_20 icon_type_add-grey' type='button'></button>
                </div>
              }
            </div>
            <SemesterLevelColumn
              droppableId={columnId}
              key={columnId}
              column={column}
              columnIndex={index}
            />
          </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default SemesterLevel;