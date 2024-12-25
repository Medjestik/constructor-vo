import React from 'react';
import '../AssessmentAbility.css';
import Button from '../../../Button/Button';
import Table from '../../../Table/Table';
import Preloader from '../../../Preloader/Preloader';
import { useParams, useNavigate } from 'react-router-dom';
import AddAssessmentTaskPopup from '../AssessmentAbilityPopup/AddAssessmentTaskPopup/AddAssessmentTaskPopup.js';
import EditAssessmentTaskPopup from '../AssessmentAbilityPopup/EditAssessmentTaskPopup/EditAssessmentTaskPopup.js';
import ButtonIcon from '../../../Button/ButtonIcon/ButtonIcon.js';
import * as assessmentApi from '../../../../utils/assessmentApi.js';

function AssessmentAbilityData({ currentProgram, onChangeQuestionCount }) {

  const { abilityId } = useParams();

  const [tasks, setTasks] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState(null);

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = React.useState(false);
  const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = React.useState(false);

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  function getData() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingData(true);
      Promise.all([
        assessmentApi.getAbilityData({ token: token, abilityId: abilityId }),
      ])
      .then(([tasks]) => {
        setTasks(tasks);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
    }
  }

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight); 
    }
  // eslint-disable-next-line
  }, [tasks]);

  React.useEffect(() => {
    getData();
    return(() => {
      setTasks([]);
    })
  // eslint-disable-next-line
  }, []);

  const listStyle = {
    height: listHeight,
  };

  const openCreateTaskPopup = () => {
    setIsAddTaskPopupOpen(true);
  }

  const openEditTaskPopup = (task) => {
    setCurrentTask(task);
    setIsEditTaskPopupOpen(true);
  }

  const handleAddTask = (data) => {
    const token = localStorage.getItem('token');
    setIsLoadingRequest(true);
    if (token) {
      const { name, description, abilityId } = data;
      assessmentApi.createTask({ token: token, abilityId: abilityId, task: { name, description } })
      .then((res) => {
        const newTasks = [...tasks, res];
        setTasks(newTasks);
        onChangeQuestionCount(Number(abilityId), newTasks.length);
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      })
    }
  }

  const handleEditTask = (data) => {
    const token = localStorage.getItem('token');
    setIsLoadingRequest(true);
    if (token) {
      const { name, description } = data;
      assessmentApi.updateTask({ token: token, abilityId: currentTask.ability_id, task: { name, description }, taskId: currentTask.id })
      .then((res) => {
        const index = tasks.indexOf(tasks.find((elem) => (elem.id === res.id)));
        setTasks([...tasks.slice(0, index), res, ...tasks.slice(index + 1)]);
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      })
    }
  }

  const handleRemoveTask = (id, abilityId) => {
    const token = localStorage.getItem('token');
    if (token) {
      assessmentApi.removeTask({ token: token, abilityId: abilityId, taskId: id })
      .then(() => {
        const newTasks = tasks.filter(item => item.id !== id);
        setTasks(newTasks);
        onChangeQuestionCount(Number(abilityId), newTasks.length);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      })
    }
  }

  const closePopup = () => {
    setIsAddTaskPopupOpen(false);
    setIsEditTaskPopupOpen(false);
  }

  return (
    <div className='assessment-ability__container'>
      {
        isLoadingData ?
        <Preloader />
        :
        <>
        <Button text='Создать задание' onClick={openCreateTaskPopup} />
        <Table>
          <div className='table__header'>
            <div className='table__main-column'>
              <div className='table__column table__column_type_header table__column_type_count'>
                <p className='table__text table__text_type_header'>№</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Наименование</p>
              </div>
              <div className='table__column table__column_type_header table__column_type_full'>
                <p className='table__text table__text_type_header'>Умение</p>
              </div>
            </div>
            <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
              <div className='btn-icon btn-icon_margin_left'></div> 
            </div>
          </div>
          <ul ref={containerHeightRef} style={Object.assign({}, listStyle)} className='table__main scroll'>
            {
              tasks.map((item, i) => (
                <li className='table__row' key={i}>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_count'>
                      <p className='table__text'>{i + 1}</p>
                    </div>
                    <div className='table__column table__column_type_full'>
                      <p className='table__text table__text_weight_bold table__text_type_active' onClick={() => openEditTaskPopup(item)}>{item.name}</p>
                    </div>
                    <div className='table__column table__column_type_full'>
                      <p className='table__text'>{item.name}</p>
                    </div>
                  </div>
                  <div className='table__column table__column_type_btn'>
                    <ButtonIcon icon='remove' color='orange' onClick={() => (handleRemoveTask(item.id , item.ability_id))} />
                  </div>
                </li>
              ))
            }
          </ul>
        </Table>
        </>
      }
      {
        isAddTaskPopupOpen &&
        <AddAssessmentTaskPopup
          isOpen={isAddTaskPopupOpen}
          onClose={closePopup} 
          onAdd={handleAddTask}
          currentAbilityId={abilityId}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isEditTaskPopupOpen &&
        <EditAssessmentTaskPopup
          isOpen={isEditTaskPopupOpen}
          onClose={closePopup} 
          onUpdate={handleEditTask} 
          currentTask={currentTask}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
    </div>
  )
}

export default AssessmentAbilityData; 
