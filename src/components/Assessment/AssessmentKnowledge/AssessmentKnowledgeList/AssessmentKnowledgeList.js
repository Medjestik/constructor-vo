import React from 'react';
import './AssessmentKnowledgeList.css';

function AssessmentKnowledgeList({ currentProgram, onOpen }) {

  const list = [ { id: 1, name: 'Знание номер 1', }, { id: 2, name: 'Знание номер 2', }, ];

  return (
    <div>
      <p>Выберите знание..</p>

      <ul>
        {
          list.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <button onClick={() => onOpen(item.id)}>Выбрать</button>
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default AssessmentKnowledgeList;  