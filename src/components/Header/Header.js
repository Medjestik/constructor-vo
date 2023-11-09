import React from 'react';
import './Header.css';
import HeaderMobile from './HeaderMobile/HeaderMobile.js';
import { useLocation, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import useOnClickOutside from '../../hooks/useOnClickOutside.js';

function Header({ windowWidth, pathname, onLogout }) {

  const currentUser = React.useContext(CurrentUserContext);
  const refMobileHeader = React.useRef();

  const location = useLocation();

  const [isProgramOpen, setIsProgramOpen] = React.useState(location.pathname.includes('/program') ? true : false);

  const [isShowMobileMenu, setIsShowMobileMenu] = React.useState(false);

  function showMobileMenu() {
    setIsShowMobileMenu(true);
    document.body.style.overflow = 'hidden';
  }

  function hideMobileMenu() {
    setIsShowMobileMenu(false);
    document.body.style.overflow = '';
  }

  useOnClickOutside(refMobileHeader, hideMobileMenu);

  React.useEffect(() => {
    setIsProgramOpen(location.pathname.includes('/program') ? true : false);
  }, [location]);

  return (
    <>
      {
        windowWidth < 1279 &&
        <HeaderMobile showMobileMenu={showMobileMenu} pathname={pathname} />
      }
      
      <header className={`header ${isShowMobileMenu ? 'header-mobile_status_show' : 'header-mobile_status_hide'}`}>
        <div className='header__container' ref={refMobileHeader}>

          {
            currentUser.avatar
            ?
            <img className='header__img' src={currentUser.avatar} alt='аватар'></img>
            :
            <div className='header__img'></div>
          }
          
          <h3 className='header__name'>{currentUser.name || ''}</h3>
          <nav className='scroll header__nav'>

            <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/page/main'>
              <div className='header__nav-link-icon'>
                <div className='header__nav-link-icon-container'>
                  <div className='header__nav-link-icon_type_person'></div>
                </div>
              </div>
              <p className='header__nav-link-text'>Главная</p>
            </NavLink>

            <NavLink onClick={hideMobileMenu} className={`header__nav-link + ${isProgramOpen ? 'header__nav-link_type_active' : ''}`} 
            to={`/page/program/list`}
            >
              <div className='header__nav-link-icon'>
                <div className='header__nav-link-icon-container'>
                  <div className='header__nav-link-icon_type_education'></div>
                </div>
              </div>
              <p className='header__nav-link-text'>Программы</p>
            </NavLink>
        
          </nav>
          
          <button className='header__nav-link header__nav-link_type_logout' onClick={onLogout}>
            <div className='header__nav-link-icon'>
                <div className='header__nav-link-icon-container'>
                  <div className='header__nav-link-icon_type_logout'></div>
                </div>
            </div>
            <p className='header__nav-link-text'>Выйти</p>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;