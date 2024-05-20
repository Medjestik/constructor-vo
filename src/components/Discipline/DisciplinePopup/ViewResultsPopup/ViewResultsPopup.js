import React from 'react';
import Popup from '../../../../components/Popup/Popup.js';

function ViewResultsPopup({ isOpen, onClose, currentProcess }) {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={'construct-discipline-popup'}
    >
      <h2 className='popup__title'>Процесс</h2>
      <p className='popup__subtitle'>{currentProcess.name}</p>

        {
          currentProcess.results && currentProcess.results.length > 0
          ?
          <ul className='popup__list popup__list_margin_top '>
            {
              currentProcess.results.map((elem, i) => (
                <li key={`children-${elem.id}`} className='popup__item'>{i + 1}. {elem.name}</li>
              ))
            }
          </ul>
          :
          <>
          <span className='badge badge_size_small badge_type_process badge_margin_top_12'>Результаты не добавлены!</span>
          </>
        }

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
      </div>
    </Popup>
  )
}

export default ViewResultsPopup;
 