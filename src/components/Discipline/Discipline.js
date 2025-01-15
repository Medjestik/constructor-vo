import React from 'react';
import './Discipline.css';
import * as disciplineApi from '../../utils/discipline.js';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import DisciplineLevel from './DisciplineLevel/DisciplineLevel.js';
import List from '../List/List.js';
import DisciplineList from './DisciplineList/DisciplineList.js';
import DisciplineChart from './DisciplineChart/DisciplineChart.js';
import AddDisciplinePopup from './DisciplinePopup/AddDisciplinePopup/AddDisciplinePopup.js';
import AttachDisciplinePopup from './DisciplinePopup/AttachDisciplinePopup/AttachDisciplinePopup.js';
import EditDisciplinePopup from './DisciplinePopup/EditDisciplinePopup/EditDisciplinePopup.js';
import ConstructDisciplinePopup from './DisciplinePopup/ConstructDisciplinePopup/ConstructDisciplinePopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import ViewResultsPopup from './DisciplinePopup/ViewResultsPopup/ViewResultsPopup.js';
import AttachSemesterPopup from './DisciplinePopup/AttachSemesterPopup/AttachSemesterPopup.js';

function Discipline({ currentProgram, isEditRights }) {

  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentStage, setCurrentStage] = React.useState({});
  const [currentProcess, setCurrentProcess] = React.useState({});
  const [currentDiscipline, setCurrentDiscipline] = React.useState({});
  const [currentSemester, setCurrentSemester] = React.useState({});

  const [rows, setRows] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [disciplines, setDisciplines] = React.useState([]);
  const [semesters, setSemesters] = React.useState([]);

  const [isOpenAddDisciplinePopup, setIsOpenAddDisciplinePopup] = React.useState(false);
  const [isOpenAttachDisciplinePopup, setIsOpenAttachDisciplinePopup] = React.useState(false);
  const [isOpenAttachSemesterPopup, setIsOpenAttachSemesterPopup] = React.useState(false);
  const [isOpenEditDisciplinePopup, setIsOpenEditDisciplinePopup] = React.useState(false);
  const [isOpenRemoveDisciplinePopup, setIsOpenRemoveDisciplinePopup] = React.useState(false);
  const [isOpenConstructDisciplinePopup, setIsOpenConstructDisciplinePopup] = React.useState(false);
  const [isOpenViewResultsPopup, setIsOpenViewResultsPopup] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' }); 
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function handleChangeData(data, disciplines) {
    const rows = [];

    data.forEach((stage, i) => {
      // Создаем row для стадии
      const stageRow = {
        name: stage.name,
        id: stage.id,
        type: 'stage',
        index: i,
      };
      rows.push([stageRow]);
  
      // Создаем row для каждого процесса стадии
      stage.processes.forEach(process => {
        let processRow = {
          name: process.name,
          id: process.id,
          disciplines: process.disciplines,
          results: process.results,
          stageId: stage.id,
          type: 'process'
        };
  
        // Проверяем, есть ли уже row с таким disciplineId
        const existingRow = rows.find(row => {
          if (row[0].disciplines && row[0].disciplines.length > 0 && processRow.disciplines) {
            return ((row[0].disciplines[0] === processRow.disciplines[0]) && row[0].type === 'process' && row[0].stageId === processRow.stageId);
          }
          return false;
        });

        if (existingRow) {
          existingRow.push(processRow);
        } else {
          rows.push([processRow]);
        }
      });
    });

    const newRows = rows.map((elem) => {
      if (elem[0].type === 'stage') {
        return { 
          process: elem,
        }
      } else {
        if (elem[0].disciplines.length > 0) {
          return {
            process: elem, 
            discipline: disciplines.filter(disc => disc.id === elem[0].disciplines[0]),
          }
        } else {
          return {
            process: elem, 
            discipline: [],
          }
        }
      }
    });

    return newRows;
  }

  function getDiscipline() {
    const token = localStorage.getItem('token');
    Promise.all([
      disciplineApi.getSemesters({ token: token, programId: currentProgram.id }),
      disciplineApi.getDisciplines({ token: token, programId: currentProgram.id }),
      disciplineApi.getStages({ token: token, programId: currentProgram.id }),
    ])
      .then(([semesters, disciplines, stages]) => {
        console.log('Semesters:', semesters);
        console.log('Disciplines:', disciplines);
        console.log('Stages:', stages);
        setStages(stages);
        setDisciplines(disciplines);
        setSemesters(semesters);
        const newRows = handleChangeData(stages, disciplines);
        setRows(newRows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  function handleChooseOption(option) {
    if (option.id !== 'export') {
      navigate('/program/' + currentProgram.id + '/discipline' + option.link);
    }
  }

  function openAddDisciplinePopup(process) {
    setCurrentProcess(process);
    setIsOpenAddDisciplinePopup(true);
  }

  function openAttachDisciplinePopup(process) {
    setCurrentStage(findStageByProcessId(stages, process.id));
    setCurrentProcess(process);
    setIsOpenAttachDisciplinePopup(true);
  }

  function openAttachSemesterPopup(semester, discipline) {
    console.log(semester);
    setCurrentSemester(semester)
    setCurrentDiscipline(discipline);
    setIsOpenAttachSemesterPopup(true);
  }

  function openEditDisciplinePopup(item) {
    setCurrentDiscipline(item);
    setIsOpenEditDisciplinePopup(true);
  }

  function openConstructDisciplinePopup(item) {
    setIsOpenConstructDisciplinePopup(true);
  }

  function openRemoveDisciplinePopup(item) {
    setCurrentDiscipline(item);
    setIsOpenRemoveDisciplinePopup(true);
  }

  function openViewResultsPopup(process) {
    setCurrentProcess(process);
    setIsOpenViewResultsPopup(true);
  }

  function closeDisciplinePopup() {
    setIsOpenAddDisciplinePopup(false);
    setIsOpenAttachDisciplinePopup(false);
    setIsOpenAttachSemesterPopup(false);
    setIsOpenEditDisciplinePopup(false);
    setIsOpenConstructDisciplinePopup(false);
    setIsOpenRemoveDisciplinePopup(false);
    setIsOpenViewResultsPopup(false);
    setIsLoadingRequest(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function handleAddDiscipline(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.createDiscipline({ token: token, programId: currentProgram.id, discipline: data })
      .then((res) => {
        const findData = findProcessById(stages, res.processes[0]);
        if (findData) {
          const updatedStages = stages.map(stage => {
            if (stage.id === findData.stageId) {
              const updatedProcesses = stage.processes.map(process => {
                if (process.id === findData.process.id) {
                  return { ...process, disciplines: [...process.disciplines, res.id] };
                }
                return process;
              });
              return { ...stage, processes: updatedProcesses };
            }
            return stage;
          });
          const newRows = handleChangeData(updatedStages, [...disciplines, res]);
          setDisciplines([...disciplines, res]);
          setStages(updatedStages);
          setRows(newRows);
        }
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditDiscipline(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.editDiscipline({ token: token, programId: currentProgram.id, discipline: item })
      .then(() => {
        getDiscipline();
        /*
        const findData = findProcessByDisciplineId(stages, item.id);
        if (findData) {
          const updatedStages = stages.map(stage => {
            if (stage.id === findData.stageId) {
              const updatedProcesses = stage.processes.map(process => {
                if (process.id === findData.process.id) {
                  return { ...process };
                }
                return process;
              });
              return { ...stage, processes: updatedProcesses };
            }
            return stage;
          });
          const newDisciplines = disciplines.map(discipline => {
            if (discipline.id === item.id) {
              return item;
            } else {
              return discipline;
            }
        });
          const newRows = handleChangeData(updatedStages, [...newDisciplines]);
          setDisciplines([...newDisciplines]);
          setStages(updatedStages);
          setRows(newRows);
        }
        closeDisciplinePopup();
        */
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
        closeDisciplinePopup();
      });
  }

  function handleConstructDiscipline() {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.constructDiscipline({ token: token, programId: currentProgram.id })
      .then(() => {
        getDiscipline();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
        closeDisciplinePopup();
      });
  }

  function handleAttachDiscipline(targetId, sourceId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.attachDiscipline({ token: token, programId: currentProgram.id, source_id: sourceId, destination_id: targetId })
      .then(() => {
        getDiscipline();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
        closeDisciplinePopup();
      });
  }

  function handleAddSemester(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.addSemester({ 
        token: token, 
        semesterId: currentSemester, 
        disciplineId: currentDiscipline.id,
        zet: data.zet,
        control: data.control,
      })
      .then(() => {
        getDiscipline();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
        closeDisciplinePopup();
      });
  }

  function handleRemoveSemester() {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.removeSemester({ 
      token: token,         
      semesterId: currentSemester, 
      disciplineId: currentDiscipline.id, 
    })
      .then(() => {
        getDiscipline();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
        closeDisciplinePopup();
      });
  }

  function handleRemoveDiscipline(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.removeDiscipline({ token: token, programId: currentProgram.id, discipline: item })
      .then(() => {
        getDiscipline();
        /*
        const findData = findProcessByDisciplineId(stages, item.id);
        if (findData) {
          const updatedStages = stages.map(stage => {
            if (stage.id === findData.stageId) {
              const updatedProcesses = stage.processes.map(process => {
                if (process.id === findData.process.id) {
                  return { ...process, disciplines: process.disciplines.filter(disciplineId => disciplineId !== item.id) };
                }
                return process;
              });
              return { ...stage, processes: updatedProcesses };
            }
            return stage;
          });
          const index = disciplines.findIndex(discipline => discipline.id === item.id);
          const newDisciplines = [...disciplines.slice(0, index), ...disciplines.slice(index + 1)];
          const newRows = handleChangeData(updatedStages, [...newDisciplines]);
          setDisciplines([...newDisciplines]);
          setStages(updatedStages);
          setRows(newRows);
        }
        closeDisciplinePopup();
        */
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
        closeDisciplinePopup();
      });
  }

  function findStageByProcessId(stages, processId) {
    for (const stage of stages) {
      const foundProcess = stage.processes.find(process => process.id === processId);
      if (foundProcess) {
        return stage;
      }
    }
    return null;
  }

  function findProcessById(stages, processId) {
    for (const stage of stages) {
      const foundProcess = stage.processes.find(process => process.id === processId);
      if (foundProcess) {
        return { stageId: stage.id, process: foundProcess };
      }
    }
    return null;
  }

  function findProcessByDisciplineId(stages, disciplineId) {
    for (const stage of stages) {
      for (const process of stage.processes) {
        if (process.disciplines.includes(disciplineId)) {
          return { stageId: stage.id, process: process };
        }
      }
    }
    return null;
  }

  React.useEffect(() => {
    getDiscipline();
    return(() => {
      setRows([]);
      setStages([]);
      setDisciplines([]);
      setSemesters([]);
      setCurrentSemester({});
      setCurrentProcess({});
      setCurrentDiscipline({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingPage 
      ?
      <Preloader />
      :
      <Section 
        title={'Проектирование дисциплин'} 
        options={[]} 
        onChooseOption={handleChooseOption} 
        heightType={'page'} 
        headerType={'large'}
      >
        <Routes>
          <Route exact path='level' element={
            <DisciplineLevel 
              rows={rows}
              disciplines={disciplines}
              semesters={semesters}
              onAdd={openAddDisciplinePopup}
              onAttach={openAttachDisciplinePopup}
              onEdit={openEditDisciplinePopup}
              onViewProcess={openViewResultsPopup}
              onConstruct={openConstructDisciplinePopup}
              onRemove={openRemoveDisciplinePopup}
              onAddSemester={openAttachSemesterPopup}
              onRemoveSemester={handleRemoveSemester}
            />
          }>
          </Route>
          <Route exact path='list' element={ 
            <List>
              <DisciplineList disciplines={disciplines} />
            </List>
          }>
          </Route>
          <Route exact path='chart' element={ 
            <DisciplineChart />
          }>
          </Route>
        </Routes>
      </Section>
    }
    {
      isOpenAddDisciplinePopup &&
      <AddDisciplinePopup
        isOpen={isOpenAddDisciplinePopup} 
        onClose={closeDisciplinePopup}
        onAdd={handleAddDiscipline}
        currentProcess={currentProcess}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenAttachDisciplinePopup &&
      <AttachDisciplinePopup
        isOpen={isOpenAttachDisciplinePopup} 
        onClose={closeDisciplinePopup}
        onAttach={handleAttachDiscipline}
        currentStage={currentStage}
        currentProcess={currentProcess}
        disciplines={disciplines}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenEditDisciplinePopup &&
      <EditDisciplinePopup
        isOpen={isOpenEditDisciplinePopup} 
        onClose={closeDisciplinePopup}
        onEdit={handleEditDiscipline}
        currentDiscipline={currentDiscipline}
        semesters={semesters}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenRemoveDisciplinePopup &&
      <ConfirmRemovePopup
        isOpen={isOpenRemoveDisciplinePopup}
        onClose={closeDisciplinePopup}
        onConfirm={handleRemoveDiscipline}
        item={currentDiscipline}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenConstructDisciplinePopup &&
      <ConstructDisciplinePopup
        isOpen={isOpenConstructDisciplinePopup}
        onClose={closeDisciplinePopup}
        onConfirm={handleConstructDiscipline}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenViewResultsPopup &&
      <ViewResultsPopup
        isOpen={isOpenViewResultsPopup}
        onClose={closeDisciplinePopup}
        currentProcess={currentProcess}
      />
    }
    {
      isOpenAttachSemesterPopup &&
      <AttachSemesterPopup
        isOpen={isOpenAttachSemesterPopup}
        onClose={closeDisciplinePopup}
        onAttach={handleAddSemester}
        onRemove={handleRemoveSemester}
        currentDiscipline={currentDiscipline}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    </>
  )
}

export default Discipline;