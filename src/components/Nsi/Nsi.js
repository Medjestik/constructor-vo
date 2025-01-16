import React from 'react';
import './Nsi.css';
import '../Levels/Levels.css';
import { getNsiName } from '../../custom/GetNsiName.js';

function Nsi({ nsi, selectedNsi, onToggleNsi, onOpenNsi, onEditNsi, onRemoveNsi }) {
  return (
    <div>
      <button className='badge badge_type_blue badge-btn badge-btn_type_add-white' type='button' onClick={onOpenNsi}>Добавить НСИ</button>
      <h4 className='nsi__caption'>Выберите НСИ из справочника:</h4>
      <ul className='nsi__list scroll'>
        {
          nsi.length > 0
          ? nsi.map((elem) => {
              const isSelected = selectedNsi.includes(elem.id); // Проверяем, выбран ли элемент
              return (
                <li className='nsi__item' key={elem.id}>
                  <div className="nsi__checkbox">
                    <label className="checkbox nsi__checkbox-item">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleNsi(elem)}
                      />
                      <span></span>
                    </label>
                  </div>
                  <div className='nsi__main'>
                    <div className='nsi__header'>
                      <h4 className='nsi__title'>{getNsiName(elem.type)}</h4>
                      <div className='nsi__header-btn-container'>
                        <button className='icon icon_margin_left-8 icon_size_16 icon_type_edit-grey' type='button' onClick={() => onEditNsi(elem)}></button>
                        <button className='icon icon_margin_left-8 icon_size_16 icon_type_remove-grey' type='button' onClick={() => onRemoveNsi(elem)}></button>
                      </div>
                    </div>
                    <p className='nsi__text'>{elem.nsiFullName || ''}</p>
                  </div>
                </li>
              );
            })
          : <p>Источники пока не добавлены.</p>
        }
      </ul>
    </div>
  );
}

export default Nsi;
