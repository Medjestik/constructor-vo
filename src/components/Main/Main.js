import React from 'react';
import './Main.css';
import Section from '../Section/Section.js';

function Main() {

  return(
    <Section title='Главная' heightType='page' headerType='large'>
      <div className='main'>
        <h1 className='main__title'>Конструктор образовательных программ для высшего образования</h1>
        <p className='main__subtitle'>Подходы к разработке программ ВО:</p>
        <div className='main__list'>
          <div className='main__item'>
            <img className='main__item-img'></img>
            <p className='main__item-text'>Реконструкция деятельности (от продукта)</p>
            <div className='main__item-links'>
              <a className='main__item-link main__item-link_type_video' href='/' target='_blank' rel='noreferrer'>Видео</a>
              <a className='main__item-link main__item-link_type_info' href='https://edu.emiit.ru/ivan/constructor/info/1.pdf' target='_blank' rel='noreferrer'>Информация</a>
            </div>
          </div>
          <div className='main__item'>
            <img className='main__item-img'></img>
            <p className='main__item-text'>Создание профессиональной среды</p>
            <div className='main__item-links'>
              <a className='main__item-link main__item-link_type_video' href='/' target='_blank' rel='noreferrer'>Видео</a>
              <a className='main__item-link main__item-link_type_info' href='https://edu.emiit.ru/ivan/constructor/info/2.pdf' target='_blank' rel='noreferrer'>Информация</a>
            </div>
          </div>
        </div>
      </div>
    </Section>

  )

}

export default Main;