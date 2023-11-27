import React from 'react';
import './AssessmentKnowledgeData.css';
import * as assessmentApi from '../../../../utils/assessmentApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import { useParams, useNavigate } from 'react-router-dom';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';

function AssessmentKnowledgeData({ knowledge, currentProgram }) {

  const navigate = useNavigate();

  const knowledgeId = useParams().knowledgeId;

  const [currentKnowledge, setCurrentKnowledge] = React.useState(knowledge.find((elem) => elem.id === knowledgeId));

  const [questionTypes, setQuestionTypes] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState({ text: '', id: 'empty', });
  const [editQuestion, setEditQuestion] = React.useState({});
  const [isNewQuestion, setIsNewQuestion] = React.useState(false); 

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

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
        setCurrentQuestion(knowledgeQuestions.length > 0 ? knowledgeQuestions[0] : [] );
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

  function changeQuestion(item) {
    setCurrentQuestion(item);
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
          <button className='section__header-btn section__header-btn_type_fix' type='button' onClick={() => navigate('/program/' + currentProgram.id +'/program-assessment/knowledge/list')}>К списку знаний</button>
        </div>
      </div>

      <div className='test'>
        <div className='test__container'>
          <div className='test__control'>
            <div className='test__control-type'>
              <p className='test__control-text'>
                <span className='test__control-text_weight_bold'>Тип вопроса: </span>
                Выбор одного правильного ответа
              </p>
            </div>
            <button className='section__header-btn section__header-btn_type_fix' type='button' onClick={handleSaveQuestion}>Сохранить вопрос</button>
          </div>
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
        <nav className='test__navigation'>
          <div className='test__navigation-header'>
            <h3 className='test__navigation-title'>Вопросы</h3>
            <span className='test__navigation-count'>{questions.length}</span>
          </div>
          <div className='test__navigation-btn'>
            <div className='test__navigation-btn-icon'></div>
            <p className='test__navigation-btn-text'>Создать новый вопрос..</p>
          </div>
          <ul className='test__navigation-list scroll'>
            {
              questions.map((elem) => (
                <li className={`test__navigation-item ${elem.id === currentQuestion.id ? 'test__navigation-item_type_active' : ''}`} key={elem.id} onClick={() => changeQuestion(elem)}>
                  <div className='test__navigation-icon'></div>
                  <p className='test__navigation-text'>{elem.text}</p>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>


      </>
    }
    </>
  )
}

export default AssessmentKnowledgeData; 
 