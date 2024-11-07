import React from 'react';
import './AssessmentKnowledgeData.css';
import * as assessmentApi from '../../../../utils/assessmentApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import { useParams, useNavigate } from 'react-router-dom';
import PopupSelect from '../../../Popup/PopupSelect/PopupSelect.js';
import ButtonIcon from '../../../Button/ButtonIcon/ButtonIcon.js';
import AssessmentKnowledgeNavigation from '../AssessmentKnowledgeNavigation/AssessmentKnowledgeNavigation.js';
import AssessmentKnowledgeAnswer from '../AssessmentKnowledgeAnswer/AssessmentKnowledgeAnswer.js';
import CreateNewQuestionPopup from '../AssessmentKnowledgePopup/CreateNewQuestionPopup.js';

function AssessmentKnowledgeData({ knowledge, currentProgram, onChangeQuestionCount }) {

  const navigate = useNavigate();

  const knowledgeId = useParams().knowledgeId;

  const [currentKnowledge, setCurrentKnowledge] = React.useState(knowledge.find((elem) => elem.id === knowledgeId));

  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(null);
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

  function openCreateQuestionPopup() {
    setIsShowCreateQuestionPopup(true);
  }

  function closePopup() {
    setIsShowCreateQuestionPopup(false);
  }

  function handleChangeQuestion(item) {
    setCurrentQuestion(item);
    setIsNewQuestion(false);
  }

  function handleChangeQuestionText(e) {
    setCurrentQuestion({...currentQuestion, text: e.target.value});
  }

  function handleCreateQuestion(question) {
    setCurrentQuestion({
      text: question.text,
      question_type: question.type,
      knowledge_id: currentKnowledge.id,
      id: parseInt(new Date().getTime()).toString(),
      answers: [
        { id: 'answer-1', is_correct: false, text: '', text2: '' },
      ]
    });
    closePopup();
    setIsNewQuestion(true);
  }

  function handleChangeAnswer(id) {
    let newAnswers = [];
    if (currentQuestion.question_type.type === "one-answer") {
      currentQuestion.answers.forEach((elem) => {
        if (elem.id === id) {
          newAnswers.push({ ...elem, is_correct: 1 });
        } else {
          newAnswers.push({ ...elem, is_correct: 0 });
        }
      })
    } else {
      currentQuestion.answers.forEach((elem) => {
        if (elem.id === id) {
          newAnswers.push({ ...elem, is_correct: !elem.is_correct });
        } else {
          newAnswers.push(elem);
        }
      })
    }
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  }

  function handleAddAnswer() {
    const newAnswers = [
      ...currentQuestion.answers, 
      { id: parseInt(new Date().getTime()).toString(), text: '', text2: '', isCorrect: false }
    ];
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  }

  function handleDeleteAnswer(id) {
    const newAnswers = currentQuestion.answers.filter(item => item.id !== id);
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  }

  function handleChangeFirstAnswerText(text, id) {
    let newAnswers = [];
    currentQuestion.answers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, text: text });
      } else {
        newAnswers.push(elem);
      }
    })
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  }

  function handleChangeSecondAnswerText(text, id) {
    let newAnswers = [];
    currentQuestion.answers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, text2: text });
      } else {
        newAnswers.push(elem);
      }
    })
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  }

  function handleDeleteQuestion() {
    const token = localStorage.getItem('token');
    assessmentApi.deleteQuestion({ token: token, knowledgeId: currentKnowledge.id, questionId: currentQuestion.id })
    .then(() => {
      const newQuestions = questions.filter(item => item.id !== currentQuestion.id);
      setQuestions(newQuestions);
      setCurrentQuestion(null);
      onChangeQuestionCount(currentKnowledge.id, newQuestions.length);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
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
      if (isNewQuestion) {
        assessmentApi.createQuestion({ token: token, knowledgeId: currentKnowledge.id, question: data })
        .then((res) => {
          const newQuestions = [...questions, res];
          setQuestions(newQuestions);
          setCurrentQuestion(res);
          onChangeQuestionCount(currentKnowledge.id, newQuestions.length);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      } else {
        assessmentApi.saveQuestion({ 
          token: token, 
          knowledgeId: currentKnowledge.id, 
          question: data, 
          questionId: currentQuestion.id 
        })
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
  }

  React.useEffect(() => {
    getData(knowledgeId);

    return(() => {
      setCurrentKnowledge({});
      setQuestionTypes([]);
      setQuestions([]);
      setCurrentQuestion(null);
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
                <ButtonIcon icon='remove' color='orange' onClick={handleDeleteQuestion} />
                <button className='section__header-btn section__header-btn_type_fix' type='button' onClick={handleSaveQuestion}>Сохранить вопрос</button>
              </div>
              <div className='test-question'>
                <h4 className='test-question__title'>Вопрос:</h4>
                <textarea 
                  className='test-textarea' 
                  value={currentQuestion.text} 
                  name={`assessment-question-text-${currentQuestion.id}`}
                  id={`assessment-question-text-${currentQuestion.id}`}
                  placeholder='Введите текст вопроса..'            
                  onChange={handleChangeQuestionText}
                  required
                >
                </textarea>
              </div>
              <div className='test-answer'>
                <h4 className='test-question__title test-question__title_mt_20'>Ответы:</h4>
                <ul className='test-answer__list'>
                  {
                    currentQuestion.answers.map((elem, i) => (
                      <AssessmentKnowledgeAnswer 
                        questionType={currentQuestion.question_type.type} 
                        answer={elem}
                        onChangeAnswer={handleChangeAnswer}
                        onChangeFirstAnswerText={handleChangeFirstAnswerText}
                        onChangeSecondAnswerText={handleChangeSecondAnswerText}
                        onDeleteAnswer={handleDeleteAnswer}
                        key={elem.id}
                        index={i} 
                      />
                    ))
                  }
                </ul>
                <button className='badge badge_type_white badge-btn badge-btn_type_add' type='button' onClick={handleAddAnswer}>Добавить</button>
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
