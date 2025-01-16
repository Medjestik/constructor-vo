import React from 'react';
import './Nsi.css';
import '../Levels/Levels.css';
import { getNsiName } from '../../custom/GetNsiName.js';

function NsiList({ nsi }) {
  return (
    <>
      <h4 className='nsi__caption'>НСИ по продукту:</h4>
      <ul className='nsi__list scroll'>
        {
          nsi.length > 0
          ? nsi.map((elem) => {
              return (
                <li className='nsi__item' key={elem.id}>
                  <div className='nsi__main'>
                    <div className='nsi__header'>
                      <h4 className='nsi__title'>{getNsiName(elem.type)}</h4>
                    </div>
                    <p className='nsi__text'>{elem.nsiFullName || ''}</p>
                  </div>
                </li>
              );
            })
          : <p>Источники пока не добавлены.</p>
        }
      </ul>
    </>
  );
}

export default NsiList;
