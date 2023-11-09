import React from 'react';
import './AssessmentKnowledge.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AssessmentKnowledgeList from './AssessmentKnowledgeList/AssessmentKnowledgeList.js';
import AssessmentKnowledgeTest from './AssessmentKnowledgeTest/AssessmentKnowledgeTest.js';

function AssessmentKnowledge({ currentProgram }) {

  const navigate = useNavigate();

  function handleOpenKnowledge(id) {
    navigate('/program/' + currentProgram.id +'/program-assessment/knowledge/' + id);
  }

  return (
    <Routes>

      <Route exact path='list' element={
          <AssessmentKnowledgeList onOpen={handleOpenKnowledge} currentProgram={currentProgram} />
      }
      />

      <Route exact path=':knowledgeId' element={
          <AssessmentKnowledgeTest currentProgram={currentProgram} />
      }
      />

    </Routes>
  )
}

export default AssessmentKnowledge;  
