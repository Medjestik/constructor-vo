import React from 'react';
import './Main.css';
import Section from '../Section/Section.js';

function Main() {

  return(
    <Section title='Методология' options={[]} heightType='page' headerType='large'>
      <div className='main'>
        <h1 className='main__title'>Конструктор образовательных программ для высшего образования</h1>
        <p className='main__subtitle'>Подходы к разработке программ ВО:</p>
        <div className='main__list'>
          <div className='main__item'>
            <p className='main__item-text'>Реконструкция деятельности (от продукта)</p>
          </div>
          <div className='main__item'>
            <p className='main__item-text'>Создание профессиональной среды</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Main;