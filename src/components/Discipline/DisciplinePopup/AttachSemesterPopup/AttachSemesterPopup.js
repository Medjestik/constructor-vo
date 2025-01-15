import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

export const disciplineForms = [
	{ id: 1, name: 'Зачёт (Зачет)' },
	{ id: 2, name: 'Зачёт с оценкой (ЗаО)' },
	{ id: 3, name: 'Экзамен (Экз)' },
	{ id: 4, name: 'Зачёт, курсовая работа (За КР)' },
	{ id: 5, name: 'Зачёт с оценкой, курсовая работа (ЗаО КР)' },
	{ id: 6, name: 'Экзамен, курсовая работа (Эк КР)' },
];

function AttachSemesterPopup({ isOpen, onClose, onAttach, onRemove, currentDiscipline, isShowRequestError, isLoadingRequest }) {

  const [form, setForm] = React.useState(currentDiscipline.control ? disciplineForms.find(form => form.name === currentDiscipline.control) : '');
  const [hours, setHours] = React.useState(currentDiscipline.zet ? currentDiscipline.zet : '');
  const [hoursError, setHoursError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { 
      zet: hours,
      control: form.name,
      semesterId: 1,
      disciplineId: 2,
    }
    onAttach(data);
  }

  function handleChangeHours(e) {
    setHours(e.target.value);
    if (e.target.checkValidity()) {
      setHoursError({ text: '', isShow: false });
    } else {
      setHoursError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeForm(option) {
    setForm(option);
  }

  React.useEffect(() => {
    if (hours.length < 1 || hoursError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [hours]);

  React.useEffect(() => {
    // setHours(currentDiscipline.name);
    // setHoursError({ isShow: false, text: '' });
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'edit-discipline-popup'}
    >
      <h2 className='popup__title'>Прикрепление к семестру</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Форма:</h4>
        <PopupSelect options={disciplineForms} currentOption={form} onChooseOption={handleChangeForm} />
      </div>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Количество ЗЕТ:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='number'
          id='attach-semester-hours'
          value={hours}
          onChange={handleChangeHours}
          name='attach-semester-hours' 
          placeholder='Введите количество ЗЕТ...'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${hoursError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {hoursError.text}
        </span>
      </div>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Закрыть</button>
        {
          currentDiscipline.zet &&
          <button className='popup__btn-save popup__btn-save_type_remove' type='button' onClick={() => onRemove()}>Удалить</button>
        }

        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default AttachSemesterPopup; 
