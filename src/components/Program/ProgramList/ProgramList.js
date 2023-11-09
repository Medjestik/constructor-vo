import React from 'react';
import './ProgramList.css';
import { useNavigate } from 'react-router-dom';
import * as programApi from '../../../utils/program.js';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import Search from '../../Search/Search.js';
import ProgramTable from '../ProgramTable/ProgramTable.js';
import AddProgramPopup from '../ProgramPopup/AddProgramPopup/AddProgramPopup.js';
import EditProgramPopup from '../ProgramPopup/EditProgramPopup/EditProgramPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function ProgramList() {

  const navigate = useNavigate();

  const [programs, setPrograms] = React.useState([]);
  const [filteredPrograms, setFilteredPrograms] = React.useState(programs);
  const [levels, setLevels] = React.useState([]);
  const [directions, setDirections] = React.useState([]);

  const [currentProgram, setCurrentProgram] = React.useState({});

  const [isOpenAddProgramPopup, setIsOpenAddProgramPopup] = React.useState(false);
  const [isOpenEditProgramPopup, setIsOpenEditProgramPopup] = React.useState(false);
  const [isOpenRemoveProgramPopup, setIsOpenRemoveProgramPopup] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
 
  function getPrograms() {
    const token = localStorage.getItem('token');
    Promise.all([
      programApi.getProgramList({ token }),
      programApi.getLevel({ token }),
      programApi.getDirection({ token }),
    ])
      .then(([program, level, direction]) => {
        console.log('Programs:', program.data);
        console.log('Levels:', level.data);
        console.log('Direction:', direction.data);
        setPrograms(program.data);
        setLevels(level.data);
        setDirections(direction.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }
  
  function handleAddProgram(program) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.addProgram({ token, program })
      .then((res) => {
        setPrograms([...programs, res.data]);
        setFilteredPrograms([...programs, res.data]);
        closeProgramPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditProgram(program) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.editProgram({ token, program })
      .then((res) => {     
        const index = programs.indexOf(programs.find((elem) => (elem.id === res.data.id)));
        setPrograms([...programs.slice(0, index), res.data, ...programs.slice(index + 1)]);
        setFilteredPrograms([...programs.slice(0, index), res.data, ...programs.slice(index + 1)]);
        closeProgramPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveProgram(program) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.removeProgram({ token, program })
    .then((res) => {     
      const arrPrograms = programs.filter((elem) => elem.id !== res);
      setPrograms(arrPrograms);
      setFilteredPrograms(arrPrograms);
      closeProgramPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function openAddProgramPopup() {
    setIsOpenAddProgramPopup(true);
  }

  function openEditProgramPopup(program) {
    setCurrentProgram(program);
    setIsOpenEditProgramPopup(true);
  }

  function openRemoveProgramPopup(program) {
    setCurrentProgram(program);
    setIsOpenRemoveProgramPopup(true);
  }

  function closeProgramPopup() {
    setIsOpenAddProgramPopup(false);
    setIsOpenEditProgramPopup(false);
    setIsOpenRemoveProgramPopup(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function handleSearch(data) {
    setFilteredPrograms(data);
  }

  function openProgram(program) {
    navigate('/program/' + program.id + '/program-info');
  }

  React.useEffect(() => {
    getPrograms();
    return(() => {
      setPrograms([]);
      setLevels([]);
      setDirections([]);
      setCurrentProgram({});
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
        <>
        <Section title='Программы' heightType='page' headerType='small'>

          <div className='section__header'>
            <Search type='medium' id='program' data={programs} onSearch={handleSearch} />
            <button className='section__header-btn' type='button' onClick={openAddProgramPopup}>Создать программу</button>
          </div>

          <ProgramTable
            programs={filteredPrograms}
            onOpen={openProgram}
            onEdit={openEditProgramPopup}
            onRemove={openRemoveProgramPopup}
          />

        </Section>
        </>
      }
      {
        isOpenAddProgramPopup &&
        <AddProgramPopup
          isOpen={isOpenAddProgramPopup} 
          onClose={closeProgramPopup}
          levels={levels}
          directions={directions}
          onAdd={handleAddProgram}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenEditProgramPopup &&
        <EditProgramPopup
          isOpen={isOpenEditProgramPopup} 
          onClose={closeProgramPopup}
          levels={levels}
          directions={directions}
          currentProgram={currentProgram}
          onEdit={handleEditProgram}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenRemoveProgramPopup &&
        <ConfirmRemovePopup
          isOpen={isOpenRemoveProgramPopup}
          onClose={closeProgramPopup}
          onConfirm={handleRemoveProgram}
          item={currentProgram}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
    </>
  )
}

export default ProgramList; 

