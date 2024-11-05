import React from 'react';
import './Navigation.css';
import { useNavigate, NavLink } from "react-router-dom";

function Navigation({ title, isPerformFunction, onBack, onLogout }) {

  const navigate = useNavigate();

  return (
    <div className='navigation'>

      {
        isPerformFunction
        ?
        <button className='navigation__btn-back' type='button' onClick={() => onBack()}> 
          <p className='navigation__btn-back-text'>{title}</p>
          <div className='navigation__btn-back-arrow'></div>
        </button>
        :
        <button className='navigation__btn-back' type='button' onClick={() => navigate(-1)}> 
          <p className='navigation__btn-back-text'>{title}</p>
          <div className='navigation__btn-back-arrow'></div>
        </button>
      }
      
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <NavLink className={({ isActive }) => 'navigation__item-container ' + (isActive ? 'navigation__item-container_type_active' : '')} to='/page/person'>
            <div className='navigation__btn navigation__btn_type_home'></div>
          </NavLink>
        </li>
        <li className='navigation__item'>
          <div className='navigation__item-container' onClick={onLogout}>
            <div className='navigation__btn navigation__btn_type_exit'></div>
          </div>
        </li>
      </ul>

    </div>
  );
}

export default Navigation;
