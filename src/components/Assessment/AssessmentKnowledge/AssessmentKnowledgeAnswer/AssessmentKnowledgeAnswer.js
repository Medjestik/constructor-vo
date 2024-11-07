import React from 'react';
import './AssessmentKnowledgeAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';
import ButtonIcon from '../../../Button/ButtonIcon/ButtonIcon';

function AssessmentKnowledgeAnswer({ questionType, answer, onChangeAnswer, onChangeFirstAnswerText, onChangeSecondAnswerText, onDeleteAnswer, index }) {

  const handleChangeFirstPartText = (e) => {
    onChangeFirstAnswerText(e.target.value, answer.id)
  }

  const handleChangeSecondPartText = (e) => {
    onChangeSecondAnswerText(e.target.value, answer.id)
  }

  const handleDeleteAnswer = (id) => {
    onDeleteAnswer(id);
  }

  if (questionType === 'one-answer') {
    return (
      <li className="answer__container" id={answer.id}>
        <label className="radio one-answer__radio">
          <input
            className="radio"
            id={`one-answer-radio ${answer.id}`}
            name="one-answer-radio"
            type="radio"
            checked={answer.is_correct ? true : false}
            onChange={() => {onChangeAnswer(answer.id)}}
          >
          </input>
          <span></span>
        </label>
        <TextareaAutosize
          className="answer__textarea"
          id={`one-answer-text ${answer.id}`}
          name={`one-answer-text ${answer.id}`}
          placeholder="Введите ответ..."
          value={answer.text || ''}
          onChange={(e) => handleChangeFirstPartText(e)}
          required
        >
        </TextareaAutosize>
        <ButtonIcon icon='remove' color='orange' onClick={() => handleDeleteAnswer(answer.id)} />
      </li>
    )
  }

  if (questionType === 'multi-answer') {
    return (
      <li className="answer__container" id={answer.id}>
        <label className="checkbox multi-answer__checkbox">
          <input 
          id={`multi-answer-checkbox ${answer.id}`}
          name={`multi-answer-checkbox ${answer.id}`}
          type="checkbox" 
          checked={answer.is_correct ? true : false} 
          onChange={() => {onChangeAnswer(answer.id)}}
          >
          </input>
          <span></span>
        </label>
        <TextareaAutosize
          className="answer__textarea"
          id={`multi-answer-text ${answer.id}`}
          name={`multi-answer-text ${answer.id}`}
          placeholder="Введите ответ..."
          value={answer.text || ''}
          onChange={(e) => handleChangeFirstPartText(e)}
          required
        >
        </TextareaAutosize>
        <ButtonIcon icon='remove' color='orange' onClick={() => handleDeleteAnswer(answer.id)} />
      </li>
    )
  }

  if (questionType === 'open-answer') {
    return (
      <li className="answer__container" id={answer.id}>
        <span className="answer__count">{`${index + 1}.`}</span>
        <TextareaAutosize
          className="answer__textarea"
          id={`open-answer-text ${answer.id}`}
          name={`open-answer-text ${answer.id}`}
          placeholder="Введите ответ..."
          defaultValue={answer.text || ''}
          onChange={(e) => handleChangeFirstPartText(e)}
          required
        >
        </TextareaAutosize>
        <ButtonIcon icon='remove' color='orange' onClick={() => handleDeleteAnswer(answer.id)} />
      </li>
    )
  }

  if (questionType === 'sequence-answer') {
    return (
      <li className="answer__container" id={answer.id}>
        <span className="answer__count">{`${index + 1}.`}</span>
        <TextareaAutosize
          className="answer__textarea"
          id={`sequence-answer-text ${answer.id}`}
          name={`sequence-answer-text ${answer.id}`}
          placeholder="Введите ответ..."
          defaultValue={answer.text || ''}
          onChange={(e) => handleChangeFirstPartText(e)}
          required
        >
        </TextareaAutosize>
        <ButtonIcon icon='remove' color='orange' onClick={() => handleDeleteAnswer(answer.id)} />
      </li>
    )
  }

  if (questionType === 'conformity-answer') {
    return (
      <li className="answer__container" id={answer.id}>
        <span className="answer__count">{`${index + 1}.`}</span>
        <TextareaAutosize
          className="answer__textarea"
          id={`conformity-answer-text ${answer.id}`}
          name={`conformity-answer-text ${answer.id}`}
          placeholder="Введите ответ..."
          defaultValue={answer.text || ''}
          onChange={(e) => handleChangeFirstPartText(e)}
          required
        >
        </TextareaAutosize>
        <TextareaAutosize
          className="answer__textarea"
          id={`conformity-answer-second-text ${answer.id}`}
          name={`conformity-answer-second-text ${answer.id}`}
          placeholder="Введите ответ..."
          defaultValue={answer.text2 || ''}
          onChange={(e) => handleChangeSecondPartText(e)}
          required
        >
        </TextareaAutosize>
        <ButtonIcon icon='remove' color='orange' onClick={() => handleDeleteAnswer(answer.id)} />
      </li>
    )
  }

  return (
    <div></div>
  )
}

export default AssessmentKnowledgeAnswer;


