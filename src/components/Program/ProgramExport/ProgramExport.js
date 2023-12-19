import React from 'react';
import Section from '../../Section/Section.js';

function ProgramExport({ }) {

  return (
    <>
      <Section 
        title={'Экспорт рабочей программы'} 
        options={[]} 
        heightType={'page'} 
        headerType={'large'}
      >
        <a className='btn-primary' href=' ' target='_blank' rel='noreferrer'>Скачать шаблон рабочей программы</a>
      </Section>
    </>
  )
}

export default ProgramExport; 