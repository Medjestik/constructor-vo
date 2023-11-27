import React from 'react';
import './ProgramList.css';
import { useNavigate } from 'react-router-dom';
import * as programApi from '../../../utils/program.js';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import AddProgramPopup from '../ProgramPopup/AddProgramPopup/AddProgramPopup.js';
import EditProgramPopup from '../ProgramPopup/EditProgramPopup/EditProgramPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function ProgramList() {

  const navigate = useNavigate();

  const [programs, setPrograms] = React.useState([]);
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
        console.log('Programs:', program);
        console.log('Levels:', level);
        console.log('Direction:', direction);
        setPrograms(program);
        setLevels(level);
        setDirections(direction);
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
        setPrograms([...programs, res]);
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
        const index = programs.indexOf(programs.find((elem) => (elem.id === res.id)));
        setPrograms([...programs.slice(0, index), res, ...programs.slice(index + 1)]);
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
      const arrPrograms = programs.filter((elem) => elem.id !== res.id);
      setPrograms(arrPrograms);
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
          <ul className='program__list'>
            <li className='program__item program__item_type_add'>
            <div className='program__item-header'></div>
              <h3 className='program__item-title'>Добавить новую программу</h3>
              <p className='program__item-description'></p>
              <button className='badge badge_margin_top_20 badge_type_white badge-btn badge-btn_type_add' type='button' onClick={openAddProgramPopup}>Добавить</button>
            </li>
            {
              programs.map((item) => (
                <li className='program__item' key={item.id}>
                  <div className='program__item-header'>
                    <div className='program__item-header-btn'>
                      <button className='icon icon_size_20 icon_type_edit-grey' type='button' onClick={() => openEditProgramPopup(item)}></button>
                      <button className='icon icon_size_20 icon_margin_left-8 icon_type_remove-grey' type='button' onClick={() => openRemoveProgramPopup(item)}></button>
                    </div>
                  </div>
                  <h3 className='program__item-title' onClick={() => openProgram(item)}>{item.profile}</h3>
                  <p className='program__item-description'>id программы: {item.id}</p>
                  <span className='badge badge_margin_top_20 badge_type_green'>{item.my_role}</span>
                </li>
              ))
            }
          </ul>


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

