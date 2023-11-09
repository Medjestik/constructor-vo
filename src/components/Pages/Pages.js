import React from 'react';
import './Pages.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import ProgramList from '../Program/ProgramList/ProgramList.js';

function Pages({ windowWidth, pathname, onLogout }) {
  return (
    <>
    <Header 
      windowWidth={windowWidth}
      pathname={pathname}
      onLogout={onLogout}
    />
      
      <div className='main-container'> 
        <Routes>

          <Route exact path='main/*' element={
              <Main
                windowWidth={windowWidth}
              />
            }/>

            <Route exact path='program/list' element={
              <ProgramList
                windowWidth={windowWidth}
              />
            }/>

        </Routes>
      </div> 



    </>
  )
}

export default Pages;
