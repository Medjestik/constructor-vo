import React from 'react';
import './ProgramParticipant.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Table from '../../Table/Table.js';
import ButtonIcon from '../../Button/ButtonIcon/ButtonIcon.js';

function ProgramParticipant({ programInfo, participants, onEdit, onRemove }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [isEditRights, setIsEditRights] = React.useState(programInfo.authorId === currentUser.id ? true : false);

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
                <ButtonIcon icon='edit' color='blue' isBlock={!isEditRights} onClick={() => (onEdit(item))} />
                <ButtonIcon icon='cancel' color='orange' isBlock={true} />
              </div>
            </li>
          ))
        }
      </ul>
    </Table>
  )
}

export default ProgramParticipant;

