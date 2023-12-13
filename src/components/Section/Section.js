import React from 'react';
import './Section.css';

function Section({ title, options, onChooseOption, heightType, headerType, children }) {

  return (
    <section className={`section__page section__page_type_${heightType}`}>
      <ul className='section__page-list'>
        <li className={`section__page-item section__page-item_type_${headerType}`}>
          <h4 className='section__page-title'>{title}</h4>
          {
            options.length > 0 &&
            <div className='section__options'>
              {options.map((option, i) => (
                <button key={`${option.type}-${i}`} className={`section__option section__option_status_${option.status}`} onClick={() => onChooseOption(option)} type='button'>
                  <div className={`section__option-icon section__option_icon_${option.icon}`}></div>
                </button>
              ))}
            </div>
          }
        </li>
      </ul>
      <div className={`section section__page-container section__page-container_type_${heightType}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;  