import React from 'react';
import './AssessmentKnowledgeAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';
import ButtonIcon from '../../../Button/ButtonIcon/ButtonIcon';
import UploadFilePopup from '../../../Popup/UploadFilePopup/UploadFilePopup';

function AssessmentKnowledgeAnswer({ questionType, answer, onChangeAnswer, onChangeFirstAnswerText, onChangeSecondAnswerText, onDeleteAnswer, index }) {

  const [isShowUploadPopup, setIsShowUploadPopup] = React.useState(false);

  const showUploadFilePopup = () => {
    setIsShowUploadPopup(true);
  }

  const closeUploadFilePopup = () => {
    setIsShowUploadPopup(false);
  }

  const handleChangeFirstPartText = (e) => {
    onChangeFirstAnswerText(e.target.value, answer.id);
  }

  const handleChangeSecondPartText = (e) => {
    onChangeSecondAnswerText(e.target.value, answer.id);
  }

  const handleDeleteAnswer = (id) => {
    onDeleteAnswer(id);
  }

  const onUpload = (file) => {
    closeUploadFilePopup();
  }

  const renderAnswerContent = () => {
    const commonTextarea = (
      <TextareaAutosize
        className="answer__textarea"
        placeholder="Введите ответ..."
        value={answer.text || ''}
        onChange={(e) => handleChangeFirstPartText(e)}
        required
      />
    );

    switch (questionType) {
      case 'one-answer':
        return (
          <>
            <label className="radio one-answer__radio">
              <input
                type="radio"
                checked={answer.is_correct || false}
                onChange={() => onChangeAnswer(answer.id)}
              />
              <span></span>
            </label>
            {commonTextarea}
          </>
        );

      case 'multi-answer':
        return (
          <>
            <label className="checkbox multi-answer__checkbox">
              <input
                type="checkbox"
                checked={answer.is_correct || false}
                onChange={() => onChangeAnswer(answer.id)}
              />
              <span></span>
            </label>
            {commonTextarea}
          </>
        );

      case 'open-answer':
      case 'sequence-answer':
        return (
          <>
            <span className="answer__count">{`${index + 1}.`}</span>
            {commonTextarea}
          </>
        );

      case 'conformity-answer':
        return (
          <>
            <span className="answer__count">{`${index + 1}.`}</span>
            {commonTextarea}
            <TextareaAutosize
              className="answer__textarea"
              placeholder="Введите второй ответ..."
              value={answer.text2 || ''}
              onChange={(e) => handleChangeSecondPartText(e)}
              required
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <li className="answer__container" id={answer.id}>
        {renderAnswerContent()}
        <div className="answer__buttons">
          <ButtonIcon icon="upload" color="blue" onClick={() => showUploadFilePopup(answer.id)} />
          <ButtonIcon icon="remove" color="orange" onClick={() => handleDeleteAnswer(answer.id)} />
        </div>
      </li>
      {
        isShowUploadPopup && (
          <UploadFilePopup
            isOpen={isShowUploadPopup}
            onClose={closeUploadFilePopup}
            popupName='upload-answer-img-popup'
            onAdd={onUpload}
            isLoadingRequest={false} 
            isShowRequestError={{text: '', isShow: false}}
          />
        )
      }
    </>
  );
}

export default AssessmentKnowledgeAnswer;
