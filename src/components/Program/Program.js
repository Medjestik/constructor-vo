import React from 'react';
import './Program.css';
import * as programApi from '../../utils/program.js';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Preloader from '../Preloader/Preloader.js';
import Navigation from '../Navigation/Navigation.js';
import ProgramMenu from './ProgramMenu/ProgramMenu.js';
import ProgramInfo from './ProgramInfo/ProgramInfo.js';
import ProgramExport from './ProgramExport/ProgramExport.js';
import ProgramDashboard from './ProgramDashboard/ProgramDashboard.js';
import Product from '../Product/Product.js';
import Competence from '../Competence/Competence.js';
import Assessment from '../Assessment/Assessment.js';
import Discipline from '../Discipline/Discipline.js';
import Semester from '../Semester/Semester.js';

function Program({ windowWidth, onLogout }) {

  const params = useParams();
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);

  const [currentProgram, setCurrentProgram] = React.useState({});
  const [isEditRights, setIsEditRights] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function backToPrograms() {
    navigate('/page/program/list');
  }

  function getProgram() {
    const token = localStorage.getItem('token');
    setIsLoadingPage(true);
    programApi.getProgramItem({ token, id: params.programId })
    .then((res) => {
      console.log(res, 'Program');
      setCurrentProgram(res);
      setIsEditRights(currentUser.id === res.authorId ? true : false);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  React.useEffect(() => {
    getProgram();
    return(() => {
      setCurrentProgram({});
    })
    // eslint-disable-next-line
  }, []);


  return (
    <>
    {
      isLoadingPage ?
      <Preloader />
      :
      <>
      <ProgramMenu currentProgram={currentProgram} />

      <div className='program'>

        <Navigation title={'К списку программ'} isPerformFunction={true} onBack={backToPrograms} onLogout={onLogout} />

        <Routes>

          <Route exact path='/info/*' element={
            <ProgramInfo currentProgram={currentProgram} isEditRights={isEditRights} />
          }
          />

          <Route exact path='/product/*' element={
              <Product currentProgram={currentProgram} isEditRights={isEditRights} />
            }
          />

          <Route exact path='/competence/*' element={
              <Competence currentProgram={currentProgram} isEditRights={isEditRights} />
            }
          />

          <Route exact path='/assessment/*' element={
              <Assessment currentProgram={currentProgram} isEditRights={isEditRights} />
            }
          />

          <Route exact path='/discipline/*' element={
              <Discipline currentProgram={currentProgram} isEditRights={isEditRights} />
            }
          />

          <Route exact path='/export/*' element={
              <ProgramExport /> 
            }
          />

          <Route exact path='/dashboard/*' element={
              <ProgramDashboard /> 
            }
          />
          
        </Routes>
      </div>
      </>
    }
    </>
  )
}

export default Program; 



