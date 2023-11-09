import React from 'react';
import './AssessmentKnowledgeTest.css';
import * as assessmentApi from '../../../../utils/assessmentApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import { useParams } from 'react-router-dom';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AssessmentKnowledgeTest({  }) {

  const knowledgeId = useParams().knowledgeId;

  const [knowledge, setKnowledge] = React.useState([]);
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});

  const [questionTypes, setQuestionTypes] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [editQuestion, setEditQuestion] = React.useState({});
  const [isNewQuestion, setIsNewQuestion] = React.useState(false); 


  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [requestMessage, setRequestMessage] = React.useState({ isShow: false, text: '', type: '', action: '' });

  function getData() {
    console.log(knowledgeId);
    setKnowledge([ { id: 2, name: 'Знать задачи применения технологии информационного моделирования на предпроектной стадии строительства автомобильных дорог общего пользования', }, { id: 1, name: 'Знание номер 1', }, { id: 3, name: 'Знание номер 3', }, { id: 4, name: 'Знание номер 4', },]);
    setCurrentKnowledge({ id: 1, name: 'Знание номер 1', });
    setIsLoadingData(false);
  }
  
  function getQuestions(id) {

  }

  function changeKnowledge(option) {
    setCurrentKnowledge(option);
  }

  React.useEffect(() => {
    getData();

    return(() => {
      setKnowledge([]);
      setCurrentKnowledge({});
      setQuestionTypes([]);
      setQuestions([]);
      setCurrentQuestion({});
      setEditQuestion({});
      setRequestMessage({ isShow: false, text: '', type: '', action: '' });
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
      <>
      <div className='section__header'>
        <div className='section__header-item section__header-item_type_large'>
          <span className='section__header-caption'>Выберите знание:</span>
          <PopupSelect options={knowledge} currentOption={currentKnowledge} onChooseOption={changeKnowledge} />
        </div>
        <div className='section__header-item section__header-item_type_content'>
          <span className='section__header-caption section__header-caption_margin_bottom'></span>
          <button className='section__header-btn section__header-btn_type_fix' type='button'>Назад</button>
        </div>
      </div>
      </>
    }
    </>
  )
}

export default AssessmentKnowledgeTest;  
 