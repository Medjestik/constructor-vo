import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import * as api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Preloader from '../Preloader/Preloader.js';
import HomePage from '../Homepage/HomePage.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Person from '../Person/Person.js';
import Program from '../Program/Program.js';
import RegisterPopup from '../Popup/RegisterPopup/RegisterPopup.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = React.useState(0);

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  const [loginError, setLoginError] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function handleLogin(login, password) {
    setIsLoadingRequest(true);
    api.login({ login, password })
      .then((res) => {
        localStorage.setItem('token', res.access_token);
        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRegister(user) {
    setIsLoadingRequest(true);
    api.register({ user })
      .then((res) => {
        console.log(res);
        closeRegisterPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleHideLoginError() {
    setLoginError(false);
  }

  function openRegisterPopup() {
    setIsRegisterPopupOpen(true);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function closeRegisterPopup() {
    setIsRegisterPopupOpen(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function tokenCheck () {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingPage(true);
      api.getUser({ token: token })
        .then((res) => {
          console.log('UserInfo', res);
          setCurrentUser(res);
          setLoggedIn(true);
          if (pathname === '/') {
            navigate('/person');
            setIsLoadingPage(false);
          } else {
            navigate(pathname);
            setIsLoadingPage(false);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoadingPage(false);
          navigate('/');
          setLoggedIn(false);
          setCurrentUser({});
        })
    } else {
      setIsLoadingPage(false);
      navigate('/');
      setLoggedIn(false);
      setCurrentUser({});
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  }

  React.useEffect(() => {
    tokenCheck();

    return(() => {
      setCurrentUser({});
    })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    function resizeWindow (evt) {
      setWindowWidth(evt.target.innerWidth);
    }
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    }
  }, []);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth])

  function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--vh', (window.innerHeight*.01) + 'px');
  }

  window.addEventListener('resize', appHeight);
  appHeight();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
      {
          isLoadingPage ?
          <Preloader />
          :
          <Routes>
            <Route exact path='/' element={
              <HomePage 
                onLogin={handleLogin}
                requestError={loginError}
                onHideRequestError={handleHideLoginError}
                onOpenRegisterPopup={openRegisterPopup}
                isLoadingRequest={isLoadingRequest}
              />
            }/>

            <Route path='/*' element={
              loggedIn === true 
              ? 
              <div className='wrapper'>
                <div className='container'>

                    <Header 
                      windowWidth={windowWidth}
                      pathname={pathname}
                      onLogout={handleLogout}
                    />
                    
                    <div className='main-container'> 
                      <Routes>

                      <Route exact path='main' element={
                          <Main
                            windowWidth={windowWidth}
                          />
                        }/>

                        <Route exact path='person' element={
                          <Person
                            windowWidth={windowWidth}
                          />
                        }/>

                        <Route exact path='program/*' element={
                          <Program
                            windowWidth={windowWidth}
                            onLogout={handleLogout}
                          />
                        }/>

                      </Routes>
                    </div>    
                  </div>
                </div>
              :
              <Navigate to='/homepage' />
            }/>
          </Routes> 
        }
        {
          isRegisterPopupOpen &&
          <RegisterPopup
            isOpen={isRegisterPopupOpen} 
            onClose={closeRegisterPopup}
            onRegister={handleRegister}
            isShowRequestError={isShowRequestError}
            isLoadingRequest={isLoadingRequest}
          />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
