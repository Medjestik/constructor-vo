import React from 'react';
import Table from '../../Table/Table.js';

function CompetenceAbilityTable({ abilities, currentItem, onEdit, onDisconnectAbility, onRemove }) {

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
        <div className='table__column_type_btn table__column_type_btn-header'>
          <button className='btn btn_type_download btn_type_download_status_active'></button>
          <button className='btn btn_type_download btn_type_download_status_active'></button> 
          <button className='btn btn_type_download btn_type_download_status_active table__btn'></button> 
        </div>
      </div>
      <ul className='table__main scroll'>
        {
          abilities.map((ability, i) => (
            <li className='table__row' key={i}>
              <div className='table__main-column'>
                <div className='table__column table__column_type_count'>
                  <p className='table__text'>{i + 1}</p>
                </div>
                <div className='table__column table__column_type_full'>
                  <p className='table__text table__text_weight_bold'>{(ability.name)}</p>
                </div>
              </div>
              <div className='table__column table__column_type_btn'>
                <button
                  className={`btn btn_type_gear btn_type_gear_status_active`}
                  onClick={() => (onEdit(currentItem, ability))}
                >
                </button>
                <button
                  className={`btn btn_type_clip btn_type_clip_status_active`}
                  onClick={() => (onDisconnectAbility(currentItem, ability))}
                >
                </button>
                <button
                  className={`btn btn_type_cancel table__btn btn_type_cancel_status_active`}
                  onClick={() => (onRemove(currentItem, ability))}
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

export default CompetenceAbilityTable; 