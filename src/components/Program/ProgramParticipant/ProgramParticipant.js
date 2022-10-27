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
        <div className='table__column_type_btn table__column_type_btn-header'>
          <button className='btn btn_type_download btn_type_download_status_active'></button> 
          <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
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
                  <p className='table__text table__text_weight_bold'>{item.name}</p>
                </div>
                <div className='table__column table__column_type_large'>
                  <p className='table__text'>{item.role.name}</p>
                </div>
              </div>
              <div className='table__column table__column_type_btn'>
                <button
                  disabled={isEditRights ? '': 'disabled'}
                  className={`btn btn_type_gear ${isEditRights ? 'btn_type_gear_status_active' : ''}`}
                  onClick={() => (onEdit(item))}
                >
                </button>
                <button
                  disabled={isEditRights && currentUser.id !== item.id ? '': 'disabled'}
                  className={`btn btn_type_cancel table__btn ${isEditRights && currentUser.id !== item.id ? 'btn_type_cancel_status_active' : ''}`}
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

