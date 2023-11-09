import React from 'react';
import './CompetenceAbility.css';
import CompetenceAbilityTable from '../CompetenceAbilityTable/CompetenceAbilityTable.js';

function CompetenceAbility({ competenceProfile, onAddAbility, onConnectAbility, onDisconnectAbility, onEditAbility, onRemoveAbility, isShowAbilities, currentItem, chooseItem }) {

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
        <h3 className='competence-header__caption'>Структура программы:</h3>
        <div className='competence-container_type_scroll scroll'>
          <ul className='competence__list'>
            {
              competenceProfile.products.map((product, productIndex) => (
                <li className='competence-list__item' key={productIndex}>
                  <p className='competence-list__name competence-list__name_weight_bold'>
                    <span className='competence-list__name_weight_bold'>Продукт {productIndex + 1}: </span> 
                    {product.name}
                  </p>
                  <ul className='competence__list competence__list_padding_left'>
                    {
                      product.stages.map((stage, stageIndex) => (
                        <li className='competence-list__item' key={stageIndex}>
                          <p className='competence-list__name'>
                            <span className='competence-list__name_weight_bold competence-list__name_type_stage'>Этап {productIndex + 1}.{stageIndex + 1}: </span>
                             {stage.name}
                          </p> 
                          <ul className='competence__list competence__list_padding_left'>
                          {
                            stage.processes.map((process, processIndex) => (
                              <li className='competence-list__item' key={processIndex}>
                                <p 
                                className={`competence-list__name competence-list__name_type_active ${isShowAbilities && process.id === currentItem.id ? 'competence-list__name_weight_bold competence-list__name_type_process' : ''}`}  
                                onClick={() => chooseItem(process, stageIndex, productIndex, processIndex)}
                                >
                                  <span className='competence-list__name_weight_bold competence-list__name_type_process'>Процесс {productIndex + 1}.{stageIndex + 1}.{processIndex + 1}: </span>
                                  {process.name}
                                </p>
                              </li>
                            ))
                          }
                          </ul>
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
        <h3 className='competence-header__caption'>Проектирование умений:</h3>
        {
          isShowAbilities 
          ?
          <>
          <p className='competence-list__name'><span className='competence-list__name_weight_bold competence-list__name_type_ability'>Процесс {currentItem.productIndex + 1}.{currentItem.stageIndex + 1}.{currentItem.processIndex + 1}:</span> {currentItem.name}</p>
          <div className='section__header section__header_margin_top'>
            <button className='section__header-btn' type='button' onClick={() => onAddAbility(currentItem)}>Создать умение</button>
            <button className='section__header-btn' type='button' onClick={() => onConnectAbility(currentItem)}>Присоединить умение</button>
          </div>
          <CompetenceAbilityTable 
            abilities={currentItem.abilities}
            currentItem={currentItem}
            onEdit={onEditAbility}
            onDisconnectAbility={onDisconnectAbility}
            onRemove={onRemoveAbility}
          />
          </>
          :
          <p className='competence-list__name_type_empty'>Выберите процесс или действие..</p>
        }
      </div>

    </div>
  )
}

export default CompetenceAbility;
