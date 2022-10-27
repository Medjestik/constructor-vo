import React from 'react';
import './Section.css';

function Section({ title, heightType, headerType, children }) {

  return (
    <section className={`section section_type_${headerType}`}>
      <ul className='section__list'>
        <li className={`section__item section__item_type_${headerType}`}>
          <h4 className='section__title'>{title}</h4>
        </li>
      </ul>
      <div className={`section__container section__container_type_${heightType}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;  