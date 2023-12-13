import React from 'react';
import Popup from '../../../Popup/Popup.js';
import * as competenceApi from '../../../../utils/competence.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';
import SelectSearch from '../../../SelectSearch/SelectSearch.js';
import Alert from '../../../Alert/Alert.js';

function ConnectAbilityPopup({ isOpen, onClose, programId, currentItem, itemType, onConnect, isShowRequestError, isLoadingRequest }) {

  const [currentAbility, setCurrentAbility] = React.useState({});
  const [abilityBase, setAbilityBase] = React.useState([]);

  const [isShowWarning, setIsShowWarning] = React.useState({isShow: false, text: ''});

  const [isLoadingData, setIsLoadingData] = React.useState(true);

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
    if (itemType === 'process') {
      //setIsShowWarning(option.parent_id.length > 0 ? {isShow: true, text: 'Данное умение уже присоединено к другому процессу.'} : {isShow: false, text: ''});
    } else {
      setIsShowWarning(option.discipline_id.length > 0 ? {isShow: true, text: 'Данное умение уже присоединено к другой дисциплине.'} : {isShow: false, text: ''});
    }
  }

  function handleCloseWarning() {
    setIsShowWarning({isShow: false, text: ''});
  }

  function getAbilityBase() {
    setIsLoadingData(true);
    const token = localStorage.getItem('token');
    competenceApi.getAbilityBase({ token: token, programId: programId })
    .then((res) => {
      setAbilityBase(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingData(false);
    });
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
    getAbilityBase();
    return(() => {
      setAbilityBase([]);
    })
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

      {
        isLoadingData 
        ?
        <PreloaderPopup />
        :
        <>
        <label className='popup__field'>
          <h4 className='popup__input-caption'>Умение:</h4>
          <SelectSearch
            options={abilityOptions} 
            currentOption={currentAbility} 
            onChooseOption={handleChangeAbility} 
          />
        </label>

        {
          isShowWarning.isShow &&
          <Alert type='warning' text={isShowWarning.text} onClose={handleCloseWarning} />
        }

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
        </>
      }


    </Popup>
  )
}

export default ConnectAbilityPopup; 