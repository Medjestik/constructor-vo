import React from 'react';
import Section from '../../Section/Section.js';
import './ProgramExport.css';

function ProgramExport({ currentProgram }) {

  return (
    <>
      <Section 
        title={'Экспорт рабочей программы'} 
        options={[]} 
        heightType={'page'} 
        headerType={'large'}
      >
        <a className='btn-export' href={`https://vpo-api.emiit.ru/api/v1/programs/${currentProgram.id}/export/download_design`} target='_blank' rel='noreferrer'>Скачать основные данные программы</a>
      </Section>
    </>
  )
}

export default ProgramExport;
