import React from 'react';
import './AssessmentKnowledgeNavigation.css';

function AssessmentKnowledgeNavigation({ questions, currentQuestion, onChangeQuestion, onCreateQuestion }) {
  return (
    <nav className='test__navigation'>
      <div className='test__navigation-header'>
        <h3 className='test__navigation-title'>Вопросы</h3>
        <span className='test__navigation-count'>{questions.length}</span>
      </div>
      <button className='test__navigation-btn' onClick={onCreateQuestion}>
        <div className='test__navigation-btn-icon'></div>
        <p className='test__navigation-btn-text'>Создать новый вопрос..</p>
      </button>
      <ul className='test__navigation-list scroll'>
        {
          questions.map((elem) => (
            <li 
              className={`test__navigation-item ${elem.id === currentQuestion?.id ? 'test__navigation-item_type_active' : ''}`} 
              key={elem.id} 
              onClick={() => onChangeQuestion(elem)}
              >
              <div className={`test__navigation-icon test__navigation-icon_type_${elem.question_type.type}`}></div>
              <p className='test__navigation-text'>{elem.text}</p>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default AssessmentKnowledgeNavigation;
