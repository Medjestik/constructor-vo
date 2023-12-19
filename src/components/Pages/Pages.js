import React from 'react';
import './Pages.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import Main from '../Main/Main.js';
import ProgramList from '../Program/ProgramList/ProgramList.js';

function Pages({ windowWidth, pathname, onLogout, onEditPerson, isLoadingRequest, isShowRequestError }) {
  return (
    <>
    <Header 
      windowWidth={windowWidth}
      pathname={pathname}
      onLogout={onLogout}
    />
      
      <div className='main-container'> 
        <Routes>

          <Route exact path='person/*' element={
            <Person
              windowWidth={windowWidth}
              onEditPerson={onEditPerson}
              isLoadingRequest={isLoadingRequest}
              isShowRequestError={isShowRequestError}
            />
          }/>

          <Route exact path='program/list' element={
            <ProgramList
              windowWidth={windowWidth}
            />
          }/>

          <Route exact path='method/*' element={
            <Main
              windowWidth={windowWidth}
            />
          }/>

        </Routes>
      </div> 



    </>
  )
}

export default Pages;
