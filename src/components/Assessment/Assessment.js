import React from 'react';
import './Assessment.css';
import { Route, Routes } from 'react-router-dom';
import { ASSESSMENT_TABS } from '../../utils/config.js';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import AssessmentKnowledge from './AssessmentKnowledge/AssessmentKnowledge.js';
import AssessmentAbility from './AssessmentAbility/AssessmentAbility.js';
import AssessmentParameters from './AssessmentParameters/AssessmentParameters.js';

function Assessment({ currentProgram }) {
  return (
    <SectionTabs type='small' path={'/program/' + currentProgram.id + '/program-assessment'} tabs={ASSESSMENT_TABS} >

      <Routes>

        <Route exact path='knowledge/*' element={
            <AssessmentKnowledge currentProgram={currentProgram} />
          }
        />

        <Route exact path='ability/*' element={
            <AssessmentAbility currentProgram={currentProgram} />
          }
        />

        <Route exact path='parameters/*' element={
            <AssessmentParameters currentProgram={currentProgram} />
          }
        />

      </Routes>

    </SectionTabs>
  )
}

export default Assessment; 
