import React from 'react';
import Table from '../../Table/Table.js';

function DisciplineKnowledgeTable({ currentItem, onDisconnectKnowledge }) {

  return (
    <Table>
      <div className='table__header'>
        <div className='table__main-column'>
          <div className='table__column table__column_type_header table__column_type_count'>
            <p className='table__text table__text_type_header'>№</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_full'>
            <p className='table__text table__text_type_header'>Наименование</p>
          </div>
        </div>
        <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
          <div className='btn-icon'></div> 
        </div>
      </div>
      <ul className='table__main scroll'>
        {
          currentItem.knowledges.map((knowledge, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_full'>
                  <p className='table__text table__text_weight_bold'>{(knowledge.name)}</p>
                </div>
              </div>
              <div className='table__column table__column_type_btn'>
                <button
                  className={`btn-icon btn-icon_color_accent-blue btn-icon_type_link`}
                  onClick={() => (onDisconnectKnowledge(knowledge))}
                  type='button'
                >
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </Table>
  );
}

export default DisciplineKnowledgeTable; 