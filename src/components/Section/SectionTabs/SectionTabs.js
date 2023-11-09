import React from 'react';
import './SectionTabs.css';
import { NavLink, useLocation } from 'react-router-dom';

function SectionTabs({ type, path, tabs, children }) {

  const { pathname } = useLocation();

  return (
    <section className='section__tabs'>
      <div className='section__tabs-list'>
        {
          tabs.map((item, i) => (
            <NavLink key={i} className={`section__tabs-item section__tabs-item_type_${type} ${pathname.includes(item.keyword) && 'section__tabs-item_type_active'} `} end to={path + item.link}>
              <h4 className='section__tabs-title'>{item.title}</h4>
            </NavLink>
          ))
        }
      </div>
      <div className='section section__tabs-container'>
        {children}
      </div>
    </section>

  );
}

export default SectionTabs;