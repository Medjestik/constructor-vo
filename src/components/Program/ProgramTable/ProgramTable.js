import React from 'react';
import Table from '../../Table/Table.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

function ProgramTable({ programs, onOpen, onEdit, onRemove }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <Table>
      <div className='table__header'>
        <div className='table__main-column'>
          <div className='table__column table__column_type_header table__column_type_count'>
            <p className='table__text table__text_type_header'>№</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_full'>
            <p className='table__text table__text_type_header'>Профиль</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_large'>
            <p className='table__text table__text_type_header'>Направление</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_large'>
            <p className='table__text table__text_type_header'>Уровень</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_medium'>
            <p className='table__text table__text_type_header'>Роль</p>
          </div>
        </div>
        <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
          <div className='btn-icon'></div> 
          <div className='btn-icon btn-icon_margin_left'></div> 
        </div>
      </div>
      <ul className='table__main scroll'>
        {
          programs.map((item, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_full' onClick={() => onOpen(item)}>
                  <p className='table__text table__text_weight_bold table__text_type_active'>{item.profile}</p>
                </div>
                <div className='table__column table__column_type_large'>
                  <p className='table__text'>{item.direction.name}</p>
                </div>
                <div className='table__column table__column_type_large'>
                  <p className='table__text'>{item.level.name}</p>
                </div>
                <div className='table__column table__column_type_medium'>
                  <p className='table__text'>{item.my_role}</p>
                </div>
              </div>
              <div className='table__column table__column_type_btn'>
                <button
                  disabled={currentUser.id !== item.authorId ? 'disabled': ''}  
                  className={`btn-icon btn-icon_type_edit ${currentUser.id === item.authorId && 'btn-icon_color_accent-blue'}`}
                  type='button'
                  onClick={() => (onEdit(item))}
                >
                </button>
                <button
                  disabled={currentUser.id !== item.authorId ? 'disabled': ''}
                  className={`btn-icon btn-icon_margin_left btn-icon_type_cancel ${currentUser.id === item.authorId && 'btn-icon_color_accent-orange'}`}
                  type='button'
                  onClick={() => (onRemove(item))}
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

export default ProgramTable; 