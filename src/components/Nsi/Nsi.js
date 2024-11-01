import React from 'react';
import './Nsi.css';

function Nsi({ nsi, onOpenNsi }) {
  return (
    <div>
      <button className='badge badge_type_blue badge-btn badge-btn_type_add-white' type='button' onClick={onOpenNsi}>Добавить НСИ</button>
      <h4 className='nsi__caption'>Выберите источник:</h4>
      <ul className='nsi__list scroll'>
        {
          nsi.length > 0
          ?
          nsi.map((elem) => (
            <li className='nsi__item' key={elem.id}>
              <div>
                {elem.nsiFullName || ''}
              </div>
            </li>
          ))
          :
          <p>Источники пока не добавлены.</p>
        }
      </ul>
    </div>
  )
}

export default Nsi;
