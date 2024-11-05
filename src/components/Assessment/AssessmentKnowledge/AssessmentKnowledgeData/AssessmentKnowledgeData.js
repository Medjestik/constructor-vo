import React from 'react';
import './AssessmentKnowledgeData.css';
import * as assessmentApi from '../../../../utils/assessmentApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import { useParams, useNavigate } from 'react-router-dom';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import ButtonIcon from '../../../Button/ButtonIcon/ButtonIcon.js';
import AssessmentKnowledgeNavigation from '../AssessmentKnowledgeNavigation/AssessmentKnowledgeNavigation.js';
import CreateNewQuestionPopup from '../AssessmentKnowledgePopup/CreateNewQuestionPopup.js';

function AssessmentKnowledgeData({ knowledge, currentProgram }) {

  const navigate = useNavigate();

  const knowledgeId = useParams().knowledgeId;

  const [currentKnowledge, setCurrentKnowledge] = React.useState(knowledge.find((elem) => elem.id === knowledgeId));

  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(null);
  const [editQuestion, setEditQuestion] = React.useState({});
  const [isNewQuestion, setIsNewQuestion] = React.useState(false); 

  const [questionTypes, setQuestionTypes] = React.useState([]);
  
  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [isShowCreateQuestionPopup, setIsShowCreateQuestionPopup] = React.useState(false);

  const [requestMessage, setRequestMessage] = React.useState({ isShow: false, text: '', type: '', action: '' });

  function getData(id) {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingData(true);
      Promise.all([
        assessmentApi.getKnowledgeData({ token: token, programId: currentProgram.id, knowledgeId: id }),
        assessmentApi.getKnowledgeQuestions({ token: token, knowledgeId: id }),
        assessmentApi.getQuestionsTypes({ token: token }),
      ])
      .then(([knowledgeData, knowledgeQuestions, questionsTypes]) => {
        console.log(knowledgeData, 'KnowledgeData');
        console.log(knowledgeQuestions, 'KnowledgeQuestions');
        setCurrentKnowledge(knowledgeData);
        setQuestions(knowledgeQuestions);
        setCurrentQuestion(null);
        setQuestionTypes(questionsTypes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
    }
  }
  
  function changeKnowledge(option) {
    getData(option.id);
  }

  function handleChangeQuestion(item) {
    setCurrentQuestion(item);
  }

  function handleCreateQuestion(question) {
    setCurrentQuestion({
      text: question.text,
      question_type: question.type,
      id: 'text',
    });
    closePopup();
  }

  function openCreateQuestionPopup() {
    setIsShowCreateQuestionPopup(true);
  }

  function closePopup() {
    setIsShowCreateQuestionPopup(false);
  }

  function handleChangeQuestionText(e) {
    setCurrentQuestion({...currentQuestion, text: e.target.value});
  }

  function handleSaveQuestion() {
    const token = localStorage.getItem('token');
    setIsLoadingRequest(true);
    if (token) {
      const data = { 
        text: currentQuestion.text,
        question_type_id: currentQuestion.question_type.id,
        answers: currentQuestion.answers,
      }
      assessmentApi.saveQuestion({ token: token, knowledgeId: currentKnowledge.id, question: data })
      .then((res) => {
        const index = questions.indexOf(questions.find((elem) => (elem.id === res.id)));
        setQuestions([...questions.slice(0, index), res, ...questions.slice(index + 1)]);
        setCurrentQuestion(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
    }
  }

  React.useEffect(() => {
    getData(knowledgeId);

    return(() => {
      setCurrentKnowledge({});
      setQuestionTypes([]);
      setQuestions([]);
      setCurrentQuestion({});
      setEditQuestion({});
      setRequestMessage({ isShow: false, text: '', type: '', action: '' });
    })
  // eslint-disable-next-line
  }, []);

  console.log(currentQuestion);

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
          <button className='section__header-btn section__header-btn_type_fix' type='button' onClick={() => navigate('/program/' + currentProgram.id +'/assessment/knowledge/list')}>К списку знаний</button>
        </div>
      </div>

      <div className='test'>
        <div className='test__container'>
          {
            currentQuestion ?
            <>
              <div className='test__control'>
                <p className='test__control-text'><span className='test__control-text_weight_bold'>Тип вопроса: </span>{currentQuestion.question_type.name}</p>
                <ButtonIcon icon='notification' />
                <button className='section__header-btn section__header-btn_type_fix' type='button' onClick={handleSaveQuestion}>Сохранить вопрос</button>
              </div>
              <div className='test-question'>
                <h4 className='test-question__title'>Вопрос:</h4>
                <textarea 
                  className='textarea textarea_height_small' 
                  value={currentQuestion.text} 
                  name={`assessment-question-text-${currentQuestion.id}`}
                  id={`assessment-question-text-${currentQuestion.id}`}
                  placeholder='Введите текст вопроса..'            
                  onChange={handleChangeQuestionText}
                  required
                >
                </textarea>
              </div>
            </>
            :
            <p className='test__caption-empty'>Выберите вопрос или создайте новый..</p>
          }
        </div>
        <AssessmentKnowledgeNavigation 
          questions={questions} 
          currentQuestion={currentQuestion}
          onChangeQuestion={handleChangeQuestion}
          onCreateQuestion={openCreateQuestionPopup}
        />
      </div>
      {
        isShowCreateQuestionPopup &&
        <CreateNewQuestionPopup 
          isOpen={isShowCreateQuestionPopup}
          onClose={closePopup}
          questionTypes={questionTypes}
          onCreate={handleCreateQuestion}

        />
      }
      </>
    }
    </>
  )
}

export default AssessmentKnowledgeData; 
 