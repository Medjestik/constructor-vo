import React from 'react';
import './AssessmentKnowledgeList.css';
import Table from '../../../Table/Table.js';

function AssessmentKnowledgeList({ knowledge, onOpen }) {

  const basisCount = [1, 2, 3, 4, 5];

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight);  
    }
  // eslint-disable-next-line
  }, [knowledge]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <Table>
      <div className='table__header'>
        <div className='table__main-column table__main-column_type_empty'>
          <div className='table__column table__column_type_header table__column_type_count'>
            <p className='table__text table__text_type_header'>№</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_full'>
            <p className='table__text table__text_type_header'>Наименование</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_large'>
            <p className='table__text table__text_type_header'>Статус</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_medium'>
            <p className='table__text table__text_type_header table__text_align_center'>Вопросы</p>
          </div>
        </div>
      </div>
      <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='table__main scroll'>
        {
          knowledge.map((item, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_full'>
                  <p className='table__text table__text_weight_bold table__text_type_active' onClick={() => onOpen(item)}>{item.name}</p>
                </div>
                <div className='table__column table__column_type_large'>
                  <ul className='table__status-list'>
                    {basisCount.map((elem) => (
                      <li className={`table__status-item ${elem <= item.questions_count ? 'table__status-item_type_active' : ''}`} key={elem + '-' + item.id}></li>
                    ))}
                  </ul>
                </div>
                <div className='table__column table__column_type_medium'>
                  <p className='table__text table__text_align_center'>{item.questions_count}</p>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </Table>
  )
}

export default AssessmentKnowledgeList;  