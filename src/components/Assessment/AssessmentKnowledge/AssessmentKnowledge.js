import React from 'react';
import './AssessmentKnowledge.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as assessmentApi from '../../../utils/assessmentApi.js';
import Preloader from '../../Preloader/Preloader.js';
import AssessmentKnowledgeList from './AssessmentKnowledgeList/AssessmentKnowledgeList.js';
import AssessmentKnowledgeData from './AssessmentKnowledgeData/AssessmentKnowledgeData.js';

function AssessmentKnowledge({ currentProgram }) {

  const navigate = useNavigate();

  const [knowledge, setKnowledge] = React.useState([]);

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  function handleOpenKnowledge(knowledge) {
    navigate('/program/' + currentProgram.id +'/assessment/knowledge/' + knowledge.id);
  }

  function getData() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingData(true);
      assessmentApi.getKnowledge({ token: token, programId: currentProgram.id })
      .then((res) => {
        console.log(res, 'Knowledge');
        setKnowledge(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
    }
  }

  const handleChangeKnowledgeQuestions = (id, count) => {
    const index = knowledge.indexOf(knowledge.find((elem) => (elem.id === id)));
    setKnowledge([...knowledge.slice(0, index), { ...knowledge[index], questions_count: count }, ...knowledge.slice(index + 1)]);
  }

  React.useEffect(() => {
    getData();

    return(() => {
      setKnowledge([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingData 
      ?
      <Preloader />
      :
      <Routes>

        <Route exact path='list' element={
          <AssessmentKnowledgeList knowledge={knowledge} onOpen={handleOpenKnowledge} />
        }
        />

        <Route exact path=':knowledgeId' element={
          <AssessmentKnowledgeData knowledge={knowledge} currentProgram={currentProgram} onChangeQuestionCount={handleChangeKnowledgeQuestions} />
        }
        />

      </Routes>
    }
    </>
  )
}

export default AssessmentKnowledge;  
