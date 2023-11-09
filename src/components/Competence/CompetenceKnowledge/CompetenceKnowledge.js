import React from 'react';
import './CompetenceKnowledge.css';
import CompetenceKnowledgeTable from '../CompetenceKnowledgeTable/CompetenceKnowledgeTable.js';

function CompetenceKnowledge({ competenceProfile, isShowKnowledge, onAddKnowledge, onConnectKnowledge, onDisconnectKnowledge, onEditKnowledge, onRemoveKnowledge, currentItem, chooseItem }) {

  const containerHeightRef = React.createRef();
  const [listHeight, setListHeight] = React.useState(0);

  React.useEffect(() => {
    if (containerHeightRef.current) {
      setListHeight(containerHeightRef.current.clientHeight - 28);
    }
  }, [containerHeightRef]);

  const listStyle = {
    height: listHeight,
  };

  return (
    <div className='competence-container'>
      <div ref={containerHeightRef} className='competence-container_type_left'>
        <h3 className='competence-header__caption'>Компетентностный профиль:</h3>
        <div className='competence-container_type_scroll scroll'>
          <ul className='competence__list'>
            {
              competenceProfile.abilities.length > 0 &&
              competenceProfile.abilities.map((ability, abilityIndex) => (
                <li className='competence-list__item' key={abilityIndex}>
                  <p 
                  className={`competence-list__name competence-list__name_type_active ${isShowKnowledge && ability.id === currentItem.id ? 'competence-list__name_weight_bold competence-list__name_type_ability' : ''}`} 
                  onClick={() => chooseItem(ability, abilityIndex)}>
                    <span className='competence-list__name_weight_bold competence-list__name_type_ability'>Умение {abilityIndex + 1}: </span> 
                    {ability.name}
                  </p>
                  <ul className='competence__list competence__list_padding_left'>
                    {
                      ability.knowledges.length > 0 &&
                      ability.knowledges.map((knowledge, knowledgeIndex) => (
                        <li className='competence-list__item' key={knowledgeIndex}>
                          <p className='competence-list__name'>
                            <span className='competence-list__name_weight_bold competence-list__name_type_knowledge'>Знание {abilityIndex + 1}.{knowledgeIndex + 1}: </span>
                             {knowledge.name}
                          </p> 
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <div className='competence-container_type_right'>
        <h3 className='competence-header__caption'>Проектирование знаний:</h3>
        {
          isShowKnowledge
          ?
          <>
          <p className='competence-list__name'><span className='competence-list__name_weight_bold competence-list__name_type_ability'>Умение {currentItem.abilityIndex + 1}:</span> {currentItem.name}</p>
          <div className='section__header section__header_margin_top'>
            <button className='section__header-btn' type='button' onClick={() => onAddKnowledge(currentItem)}>Создать знание</button>
            <button className='section__header-btn' type='button' onClick={() => onConnectKnowledge(currentItem)}>Присоединить знание</button> 
          </div>
          <CompetenceKnowledgeTable
            knowledges={currentItem.knowledges}
            currentItem={currentItem}
            onEdit={onEditKnowledge}
            onDisconnectKnowledge={onDisconnectKnowledge}
            onRemove={onRemoveKnowledge}
          />
          </>
          :
          <p className='competence-list__name_type_empty'>Выберите умение..</p>
        }
      </div>
    </div>
  )
}

export default CompetenceKnowledge;
