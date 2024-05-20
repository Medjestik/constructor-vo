import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AttachDisciplinePopup({ isOpen, onClose, onAttach, currentStage, currentProcess, disciplines, isShowRequestError, isLoadingRequest }) {

  const [currentDiscipline, setCurrentDiscipline] = React.useState({});
  const [disciplineOptions, setDisciplineOptions] = React.useState([]);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    //const participant = { user_id: currentUser.id, role_id: currentRole.id, }
    onAttach(currentDiscipline.id, currentProcess.disciplines[0]);
  }

  function handleChangeDiscipline(option) {
    setCurrentDiscipline(option);
  }

  function handleFindProcesses(processes, processId) {
    const index = processes.findIndex(process => process.id === processId);
    const process = processes.find(process => process.id === processId);
    if (index === -1) {
      return null;
    }
    const availableProcesses = {
      previousProcess: null,
      nextProcess: null,
    };
    // Найти предыдущий уникальный процесс
    let prevIndex = index - 1;
    while (prevIndex >= 0 && processes[prevIndex].disciplines[0] === process.disciplines[0]) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      availableProcesses.previousProcess = processes[prevIndex];
    }

    // Найти следующий уникальный процесс
    let nextIndex = index + 1;
    while (nextIndex < processes.length && processes[nextIndex].disciplines[0] === process.disciplines[0]) {
      nextIndex++;
    }
    if (nextIndex < processes.length) {
      availableProcesses.nextProcess = processes[nextIndex];
    }

    return availableProcesses;
  }

  React.useEffect(() => {
    if (currentDiscipline.id === 'placeholder') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentProcess]);

  React.useEffect(() => {
    let availableDisciplines = [];
    const findProcesses = handleFindProcesses(currentStage.processes, currentProcess.id);
    if (findProcesses.previousProcess) {
      const discipline = disciplines.find((elem) => elem.id === findProcesses.previousProcess.disciplines[0]);
      availableDisciplines = [...availableDisciplines, discipline];
    }
    if (findProcesses.nextProcess) {
      const discipline = disciplines.find((elem) => elem.id === findProcesses.nextProcess.disciplines[0]);
      availableDisciplines = [...availableDisciplines, discipline];
    }
    //console.log(availableDisciplines);
    setDisciplineOptions([{ name: 'Выберите дисциплину...', id: 'placeholder', }, ...availableDisciplines]);
    setCurrentDiscipline({ name: 'Выберите дисциплину...', id: 'placeholder', });
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'add-participant-popup'}
    >
      <h2 className='popup__title'>Прикрепление дисциплины</h2>

      <div className='popup__field'>
        <h4 className='popup__input-caption'>Дисциплина:</h4>
        <PopupSelect options={disciplineOptions} currentOption={currentDiscipline} onChooseOption={handleChangeDiscipline} />
      </div>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
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

export default AttachDisciplinePopup;
