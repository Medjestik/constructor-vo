import React from 'react';
import Popup from '../../../Popup/Popup.js';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';

function ConnectAbilityPopup({ isOpen, onClose, currentItem, abilityBase, onConnect, isShowRequestError, isLoadingRequest }) {

  const [currentAbility, setCurrentAbility] = React.useState({});

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const uniqueAbilities = abilityBase.filter(( el ) => {
    if (currentItem.abilities.map((elem => elem.id)).indexOf( el.id ) < 0) {
      return el;
    } else {
      return false;
    }
  })

  const abilityOptions = [
    { name: 'Выберите умение...', id: 'placeholder', },
    ...uniqueAbilities,
  ]

  function handleSubmit(e) {
    e.preventDefault();
    onConnect(currentAbility.id);
  }

  function handleChangeAbility(option) {
    setCurrentAbility(option);
  }

  React.useEffect(() => {
    if (currentAbility.id === 'placeholder') {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [currentAbility]);

  React.useEffect(() => {
    setCurrentAbility(abilityOptions[0]);
  // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'connect-ability-popup'}
    >
      <h2 className='popup__title'>Присоединение умения</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Умение:</h4>
        <SelectSearch
          options={abilityOptions} 
          currentOption={currentAbility} 
          onChooseOption={handleChangeAbility} 
        />
      </label>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default ConnectAbilityPopup; 