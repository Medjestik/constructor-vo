import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import * as api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Preloader from '../Preloader/Preloader.js';
import HomePage from '../Homepage/HomePage.js';
import Pages from '../Pages/Pages.js';
import Program from '../Program/Program.js';
import UpdatePassword from '../UpdatePassword/UpdatePassword.js';
import RegisterPopup from '../Popup/RegisterPopup/RegisterPopup.js';
import ResetPasswordPopup from '../Popup/ResetPasswordPopup/ResetPasswordPopup.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = React.useState(0);

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isResetPasswordPopupOpen, setIsResetPasswordPopupOpen] = React.useState(false);
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

  function handleRegister(email, first_name, last_name, middle_name, password1, password2) {
    setIsLoadingRequest(true);
    api.register({ email: email, first_name: first_name, last_name: last_name, middle_name: middle_name, password1: password1, password2: password2 })
      .then((res) => {
        console.log(res);
        closePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleResetPassword(mail) {
    setIsLoadingRequest(true);
    api.resetPassword({ email: mail })
      .then((res) => {
        setIsShowRequestError({ isShow: true, text: 'Письмо направлено на почту!' });
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleUpdatePassword(newPassword, repeatPassword, uid, token) {
    setIsLoadingRequest(true);
    api.updatePassword({ new_password1: newPassword, new_password2: repeatPassword, uid: uid, token: token, })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditPerson(firstName, lastName, fatherName, mail) {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingRequest(true);
      api.editPerson({ token:token, first_name: firstName, last_name: lastName, middle_name: fatherName, email: mail })
        .then((res) => {
          setCurrentUser({...currentUser, ...res});
          setIsShowRequestError({ isShow: true, text: 'Данные успешно сохранены!' });
        })
        .catch((err) => {
          console.log(err);
          setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
    }
  }

  function handleHideLoginError() {
    setLoginError(false);
  }

  function openRegisterPopup() {
    setIsRegisterPopupOpen(true);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function openResetPasswordPopup() {
    setIsResetPasswordPopupOpen(true);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function closePopup() {
    setIsRegisterPopupOpen(false);
    setIsResetPasswordPopupOpen(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function tokenCheck () {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingPage(true);
      api.getUser({ token: token })
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          if (pathname === '/') {
            navigate('page/person');
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
      if (!pathname.includes('reset_password')) {
        setIsLoadingPage(false);
        navigate('/');
        setLoggedIn(false);
        setCurrentUser({});
      } else {
        setIsLoadingPage(false);
        setLoggedIn(true);
        setCurrentUser({});
      }
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
                onOpenResetPasswordPopup={openResetPasswordPopup}
                isLoadingRequest={isLoadingRequest}
              />
            }/>

            <Route path='/*' element={
              loggedIn === true 
              ? 
              <div className='wrapper'>
                <div className='container'>
                  <Routes>
                    <Route exact path='page/*' element={
                      <Pages
                        windowWidth={windowWidth}
                        pathname={pathname}
                        onLogout={handleLogout}
                        onEditPerson={handleEditPerson}
                        isLoadingRequest={isLoadingRequest}
                        isShowRequestError={isShowRequestError}
                      />
                    }/>

                    <Route exact path='program/:programId/*' element={
                      <Program
                        windowWidth={windowWidth}
                        onLogout={handleLogout}
                      />
                    }/>

                    <Route exact path='reset_password/*' element={
                      <UpdatePassword
                      onUpdate={handleUpdatePassword}
                      isLoadingRequest={isLoadingRequest}
                      isShowRequestError={isShowRequestError}
                      />
                    }/>

                  </Routes>
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
            onClose={closePopup}
            onRegister={handleRegister}
            isShowRequestError={isShowRequestError}
            isLoadingRequest={isLoadingRequest}
          />
        }
        {
          isResetPasswordPopupOpen &&
          <ResetPasswordPopup
            isOpen={isResetPasswordPopupOpen} 
            onClose={closePopup}
            onResetPassword={handleResetPassword}
            isShowRequestError={isShowRequestError}
            isLoadingRequest={isLoadingRequest}
          />
        }

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
