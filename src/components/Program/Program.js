import React from 'react';
import './Program.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import ProgramList from './ProgramList/ProgramList.js';
import ProgramItem from './ProgramItem/ProgramItem.js';

function Program({ windowWidth, onLogout }) {

  const navigate = useNavigate();

  function backToPrograms() {
    navigate('/program/list');
  }

  return (
    <div className='program'>
        <Navigation isPerformFunction={true} onBack={backToPrograms} onLogout={onLogout} />

        <Routes>

            <Route exact path='/list' element={
                <ProgramList />
              }
            />

            <Route exact path='/:programId/*' element={
                <ProgramItem />
              }
            />

        </Routes>
    </div>
  )
}

export default Program; 



