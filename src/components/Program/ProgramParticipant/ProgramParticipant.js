import React from 'react';
import './ProgramParticipant.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Table from '../../Table/Table.js';

function ProgramParticipant({ participants, onEdit, onRemove, isEditRights }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <Table>
      <div className='table__header'>
        <div className='table__main-column'>
          <div className='table__column table__column_type_header table__column_type_count'>
            <p className='table__text table__text_type_header'>№</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_full'>
            <p className='table__text table__text_type_header'>Имя</p>
          </div>
          <div className='table__column table__column_type_header table__column_type_large'>
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
          participants.map((item, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_full'>
                  <p className='table__text table__text_weight_bold'>{item.user.name}</p>
                </div>
                <div className='table__column table__column_type_large'>
                  <p className='table__text'>{item.role.name}</p>
                </div>
              </div>
              <div className='table__column table__column_type_btn'>
                <button
                  disabled={isEditRights ? '': 'disabled'}
                  className={`btn-icon btn-icon_type_edit ${isEditRights && 'btn-icon_color_accent-blue'}`}
                  type='button'
                  onClick={() => (onEdit(item))}
                >
                </button>
                <button
                  disabled={isEditRights && currentUser.id !== item.id ? '': 'disabled'}
                  className={`btn-icon btn-icon_margin_left btn-icon_type_cancel ${isEditRights && currentUser.id !== item.id && 'btn-icon_color_accent-orange'}`}
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
  )
}

export default ProgramParticipant;

