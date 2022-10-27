import React from 'react';
import './Breadcrumb.css';
import { useNavigate } from 'react-router-dom';

function Breadcrumb({ breadcrumb }) {

  const navigate = useNavigate();

  function openLink(link) {
    navigate(link);
  }

  return (
    <ul className='breadcrumb__list'>
      {
        breadcrumb.map((elem, i) => (
          elem.active 
          ?
          <li className='breadcrumb__item breadcrumb__item_type_active' onClick={() => openLink(elem.link)} key={i}>
            <p className='breadcrumb__text breadcrumb__text_type_current'>{elem.name}</p>
          </li>
          :
          <li className='breadcrumb__item' key={i}>
            <p className='breadcrumb__text breadcrumb__text_type_active'>{elem.name}</p>
          </li>
        ))
      }
    </ul>
  )
}

export default Breadcrumb;