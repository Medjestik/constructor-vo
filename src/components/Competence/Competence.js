import React from 'react';
import './Competence.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import PopupSelect from '../Popup/PopupSelect/PopupSelect.js';
import CompetenceAbility from './CompetenceAbility/CompetenceAbility.js';
import CompetenceKnowledge from './CompetenceKnowledge/CompetenceKnowledge.js';
import * as competenceApi from '../../utils/competence.js';
import Preloader from '../Preloader/Preloader.js';
import AddAbilityPopup from './CompetencePopup/AddAbilityPopup/AddAbilityPopup.js';
import ConnectAbilityPopup from './CompetencePopup/ConnectAbilityPopup/ConnectAbilityPopup.js';
import DisconnectAbilityPopup from './CompetencePopup/DisconnectAbilityPopup/DisconnectAbilityPopup.js';
import EditAbilityPopup from './CompetencePopup/EditAbilityPopup/EditAbilityPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import AddKnowledgePopup from './CompetencePopup/AddKnowledgePopup/AddKnowledgePopup.js';
import ConnectKnowledgePopup from './CompetencePopup/ConnectKnowledgePopup/ConnectKnowledgePopup.js';
import DisconnectKnowledgePopup from './CompetencePopup/DisconnectKnowledgePopup/DisconnectKnowledgePopup.js';
import EditKnowledgePopup from './CompetencePopup/EditKnowledgePopup/EditKnowledgePopup.js'

function Competence({ currentProgram, isEditRights }) {

  const navigate = useNavigate();
  const location = useLocation();

  const competenceOptions = [
    { name: 'Выберите этап проектирования...', id: 'placeholder', },
    { name: 'Проектирование умений', id: '1', },
    { name: 'Проектирование знаний', id: '2', },
  ]

  const [competenceProfile, setCompetenceProfile] = React.useState({});

  const [currentOption, setCurrentOption] = React.useState(competenceOptions[0]);
  const [currentItem, setCurrentItem] = React.useState({});
  const [currentAbility, setCurrentAbility] = React.useState({});
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});

  const [isShowAbilities, setIsShowAbilities] = React.useState(false);
  const [isShowKnowledge, setIsShowKnowledge] = React.useState(false);
  
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [isAddAbilitiesPopupOpen, setIsAddAbilitiesPopupOpen] = React.useState(false);
  const [isConnectAbilitiesPopupOpen, setIsConnectAbilitiesPopupOpen] = React.useState(false);
  const [isDisconnectAbilitiesPopupOpen, setIsDisconnectAbilitiesPopupOpen] = React.useState(false);
  const [isEditAbilitiesPopupOpen, setIsEditAbilitiesPopupOpen] = React.useState(false);
  const [isRemoveAbilitiesPopupOpen, setIsRemoveAbilitiesPopupOpen] = React.useState(false);

  const [isAddKnowledgePopupOpen, setIsAddKnowledgePopupOpen] = React.useState(false);
  const [isConnectKnowledgePopupOpen, setIsConnectKnowledgePopupOpen] = React.useState(false);
  const [isDisconnectKnowledgePopupOpen, setIsDisconnectKnowledgePopupOpen] = React.useState(false);
  const [isEditKnowledgePopupOpen, setIsEditKnowledgePopupOpen] = React.useState(false);
  const [isRemoveKnowledgePopupOpen, setIsRemoveKnowledgePopupOpen] = React.useState(false);

  function handleChooseAbility(item, stageIndex, productIndex, processIndex) {
    setCurrentItem({...item, stageIndex: stageIndex, productIndex: productIndex, processIndex: processIndex });
    setIsShowAbilities(true);
  }

  function handleChooseKnowledge(item, abilityIndex) {
    setCurrentItem({...item, abilityIndex: abilityIndex});
    setIsShowKnowledge(true);
  }

  function openAddAbilitiesPopup(item) {
    setCurrentItem(item);
    setIsAddAbilitiesPopupOpen(true);
  }

  function openConnectAbilitiesPopup(item) {
    setCurrentItem(item);
    setIsConnectAbilitiesPopupOpen(true);
  }

  function openDisconnectAbilitiesPopup(item, ability) {
    setCurrentItem(item);
    setCurrentAbility(ability);
    setIsDisconnectAbilitiesPopupOpen(true);
  }

  function openEditAbilitiesPopup(item, ability) {
    setCurrentItem(item);
    setCurrentAbility(ability);
    setIsEditAbilitiesPopupOpen(true);
  }

  function openRemoveAbilitiesPopup(item, ability) {
    setCurrentItem(item);
    setCurrentAbility(ability);
    setIsRemoveAbilitiesPopupOpen(true);
  }

  function openAddKnowledgePopup(item) {
    setCurrentItem(item);
    setIsAddKnowledgePopupOpen(true);
  }

  function openConnectKnowledgePopup(item) {
    setCurrentItem(item);
    setIsConnectKnowledgePopupOpen(true);
  }

  function openDisconnectKnowledgePopup(item, knowledge) {
    setCurrentItem(item);
    setCurrentKnowledge(knowledge);
    setIsDisconnectKnowledgePopupOpen(true);
  }

  function openEditKnowledgePopup(item, knowledge) {
    setCurrentItem(item);
    setCurrentKnowledge(knowledge);
    setIsEditKnowledgePopupOpen(true);
  }

  function openRemoveKnowledgePopup(item, knowledge) {
    setCurrentItem(item);
    setCurrentKnowledge(knowledge);
    setIsRemoveKnowledgePopupOpen(true);
  }

  function closeCompetencePopup() {
    setIsAddAbilitiesPopupOpen(false);
    setIsConnectAbilitiesPopupOpen(false);
    setIsDisconnectAbilitiesPopupOpen(false);
    setIsEditAbilitiesPopupOpen(false);
    setIsRemoveAbilitiesPopupOpen(false);
    setIsAddKnowledgePopupOpen(false);
    setIsConnectKnowledgePopupOpen(false);
    setIsDisconnectKnowledgePopupOpen(false);
    setIsEditKnowledgePopupOpen(false);
    setIsRemoveKnowledgePopupOpen(false);
    setIsShowRequestError({ isShow: false, text: '' });
    setIsLoadingRequest(false);
  }

  function getCompetenceProfile() {
    const token = localStorage.getItem('token');
    Promise.all([
      competenceApi.getCompetenceProfile({ token, programId: currentProgram.id }),
    ])
      .then(([profile]) => {
        console.log('CompetenceProfile:', profile.data);
        setCompetenceProfile(profile.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  function handleChangeOption(option) {
    setIsShowAbilities(false);
    setIsShowKnowledge(false);
    setCurrentItem({});
    if (option.id === '1') {
      setCurrentOption(competenceOptions[1]);
      navigate('/program/' + currentProgram.id + '/competence-tab/ability');
    } else if (option.id === '2') {
      setCurrentOption(competenceOptions[2]);
      navigate('/program/' + currentProgram.id + '/competence-tab/knowledge');
    } else {
      navigate('/program/' + currentProgram.id + '/competence-tab');
    }
  }

  function handleAddAbilities(item, data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.addAbilities({ token, processId: item.id, ability: data })
      .then((res) => {
        const newAbilities = [...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities, res.data]
        const newProcesses = [
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes.slice(0, item.processIndex),
          {
            ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex], 
            abilities: newAbilities
          },
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes.slice(item.processIndex + 1),
        ]
        const newStages = [
          ...competenceProfile.products[item.productIndex].stages.slice(0, item.stageIndex),
          { ...competenceProfile.products[item.productIndex].stages[item.stageIndex], processes: newProcesses, },
          ...competenceProfile.products[item.productIndex].stages.slice(item.stageIndex + 1),
        ]
        const newProducts = [
          ...competenceProfile.products.slice(0, item.productIndex),
          { ...competenceProfile.products[item.productIndex], stages: newStages, },
          ...competenceProfile.products.slice(item.productIndex + 1),
        ]
        const newAllAbilities = ([...competenceProfile.abilities, res.data]);

        setCompetenceProfile({...competenceProfile, products: newProducts, abilities: newAllAbilities});
        setCurrentItem({...currentItem, abilities: newAbilities});
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleConnectAbilities(item, abilityId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.connectAbilities({ token, processId: item.id, abilityId: abilityId })
    .then((res) => {
      const newAbilities = [...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities, res.data]
      const newProcesses = [
        ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes.slice(0, item.processIndex),
        {
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex], 
          abilities: newAbilities
        },
        ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes.slice(item.processIndex + 1),
      ]
      const newStages = [
        ...competenceProfile.products[item.productIndex].stages.slice(0, item.stageIndex),
        { ...competenceProfile.products[item.productIndex].stages[item.stageIndex], processes: newProcesses, },
        ...competenceProfile.products[item.productIndex].stages.slice(item.stageIndex + 1),
      ]
      const newProducts = [
        ...competenceProfile.products.slice(0, item.productIndex),
        { ...competenceProfile.products[item.productIndex], stages: newStages, },
        ...competenceProfile.products.slice(item.productIndex + 1),
      ]
      setCompetenceProfile({...competenceProfile, products: newProducts});
      setCurrentItem({...currentItem, abilities: newAbilities});
      closeCompetencePopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleDisconnectAbilities(item, ability) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.disconnectAbilities({ token, processId: item.id, abilityId: ability.id })
      .then((res) => {
        const newAbilities = [...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities.filter((elem) => elem.id !== res.data.id)];

        const newProcesses = [
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes.slice(0, item.processIndex),
          {
            ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex], 
            abilities: newAbilities
          },
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes.slice(item.processIndex + 1),
        ]
        const newStages = [
          ...competenceProfile.products[item.productIndex].stages.slice(0, item.stageIndex),
          { ...competenceProfile.products[item.productIndex].stages[item.stageIndex], processes: newProcesses, },
          ...competenceProfile.products[item.productIndex].stages.slice(item.stageIndex + 1),
        ]
        const newProducts = [
          ...competenceProfile.products.slice(0, item.productIndex),
          { ...competenceProfile.products[item.productIndex], stages: newStages, },
          ...competenceProfile.products.slice(item.productIndex + 1),
        ]

        setCompetenceProfile({...competenceProfile, products: newProducts});
        setCurrentItem({...currentItem, abilities: newAbilities});
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
}

  function handleEditAbilities(item, data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.editAbilities({ token, programId: currentProgram.id, ability: data })
      .then((res) => {
        const index = competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities.indexOf(competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities.find((elem) => (elem.id === data.id)));

        const newAbilities = [
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities.slice(0, index), 
          data,
          ...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities.slice(index + 1)
        ]

        setCompetenceProfile(res.data);
        setCurrentItem({...currentItem, abilities: newAbilities});
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveAbilities(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    const item = currentItem;
    competenceApi.removeAbilities({ token, programId: currentProgram.id, abilityId: data.id })
      .then((res) => {
        const newAbilities = [...competenceProfile.products[item.productIndex].stages[item.stageIndex].processes[item.processIndex].abilities.filter((elem) => elem.id !== data.id)];
        setCompetenceProfile(res.data);
        setCurrentItem({...currentItem, abilities: newAbilities});
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleAddKnowledge(item, data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.addKnowledge({ token, abilityId: item.id, knowledge: data })
      .then((res) => {
        const newKnowledge = [...competenceProfile.abilities[item.abilityIndex].knowledges, res.data];

        const newAbilities = [
          ...competenceProfile.abilities.slice(0, item.abilityIndex),
          {
            ...competenceProfile.abilities[item.abilityIndex], 
            knowledges: newKnowledge
          },
          ...competenceProfile.abilities.slice(item.abilityIndex + 1),
        ]

        setCompetenceProfile({...competenceProfile, abilities: newAbilities, knowledges: [...competenceProfile.knowledges, res.data]});
        setCurrentItem({...currentItem, knowledges: newKnowledge});
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleConnectKnowledge(item, knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.connectKnowledge({ token, abilityId: item.id, knowledgeId: knowledgeId })
    .then((res) => {
      const index = competenceProfile.abilities.indexOf(competenceProfile.abilities.find((elem) => (elem.id === res.data.id)));
      const newAbilities = [
        ...competenceProfile.abilities.slice(0, index), 
        res.data,
        ...competenceProfile.abilities.slice(index + 1),
      ]

      setCompetenceProfile({...competenceProfile, abilities: newAbilities});
      setCurrentItem(res.data);
      closeCompetencePopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleDisconnectKnowledge(item, knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.disconnectKnowledge({ token, abilityId: item.id, knowledgeId: knowledgeId })
    .then((res) => {
      console.log(res);
      const index = competenceProfile.abilities.indexOf(competenceProfile.abilities.find((elem) => (elem.id === res.data.id)));
      const newAbilities = [
       ...competenceProfile.abilities.slice(0, index), 
        res.data,
        ...competenceProfile.abilities.slice(index + 1),
      ]

      setCompetenceProfile({...competenceProfile, abilities: newAbilities});
      setCurrentItem(res.data);
      closeCompetencePopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleEditKnowledge(item, data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.editKnowledge({ token, programId: currentProgram.id, knowledge: data })
      .then((res) => {
        const index = item.knowledges.indexOf(item.knowledges.find((elem) => (elem.id === data.id)));
        const indexAll = competenceProfile.knowledges.indexOf(competenceProfile.knowledges.find((elem) => (elem.id === data.id)));
        setCompetenceProfile({
          ...competenceProfile, 
          abilities: res.data,
          knowledges: [...competenceProfile.knowledges.slice(0, indexAll), data, ...competenceProfile.knowledges.slice(indexAll + 1)],
        });
        setCurrentItem({
          ...currentItem, 
          knowledges: [...item.knowledges.slice(0, index), data, ...item.knowledges.slice(index + 1)],
        });
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveKnowledge(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.removeKnowledge({ token, programId: currentProgram.id, knowledge: data })
      .then((res) => {
        setCompetenceProfile({
          ...competenceProfile, 
          abilities: res.data, 
          knowledges: [...competenceProfile.knowledges.filter((elem) => elem.id !== data.id)]
        });
        setCurrentItem({
          ...currentItem, 
          knowledges: currentItem.knowledges.filter((elem) => elem.id !== data.id)
        });
        closeCompetencePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  React.useEffect(() => {
    if (location.pathname.includes('ability')) {
      setCurrentOption(competenceOptions[1]);
    } else if (location.pathname.includes('knowledge')) {
      setCurrentOption(competenceOptions[2]);
    } else {
      setCurrentOption(competenceOptions[0]);
    }
  // eslint-disable-next-line
  }, [location]);

  React.useEffect(() => {
    getCompetenceProfile();
    return(() => {
      setCompetenceProfile({});
      setCurrentItem({});
      setCurrentAbility({});
      setCurrentKnowledge({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isLoadingPage 
        ?
        <Preloader />
        :
        <>
        <div className='competence-header'>
          <h2 className='competence-header__caption'>Выберите этап проектирования компетентносного профиля:</h2>
          <PopupSelect options={competenceOptions} currentOption={currentOption} onChooseOption={handleChangeOption} />
        </div>

        <Routes>

          <Route exact path='ability' element={
              <CompetenceAbility 
                competenceProfile={competenceProfile}
                onAddAbility={openAddAbilitiesPopup}
                onConnectAbility={openConnectAbilitiesPopup}
                onDisconnectAbility={openDisconnectAbilitiesPopup}
                onEditAbility={openEditAbilitiesPopup}
                onRemoveAbility={openRemoveAbilitiesPopup}
                isShowAbilities={isShowAbilities}
                currentItem={currentItem}
                chooseItem={handleChooseAbility}
              />
            }
          />

          <Route exact path='knowledge' element={
              <CompetenceKnowledge
                competenceProfile={competenceProfile}
                isShowKnowledge={isShowKnowledge}
                onAddKnowledge={openAddKnowledgePopup}
                onConnectKnowledge={openConnectKnowledgePopup}
                onDisconnectKnowledge={openDisconnectKnowledgePopup}
                onEditKnowledge={openEditKnowledgePopup}
                onRemoveKnowledge={openRemoveKnowledgePopup}
                currentItem={currentItem}
                chooseItem={handleChooseKnowledge}
              />
            }
          />

        </Routes>
      </>
      }
      {
        isAddAbilitiesPopupOpen &&
        <AddAbilityPopup
          isOpen={isAddAbilitiesPopupOpen}
          onClose={closeCompetencePopup}
          currentItem={currentItem}
          onAdd={handleAddAbilities}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isConnectAbilitiesPopupOpen &&
        <ConnectAbilityPopup
          isOpen={isConnectAbilitiesPopupOpen}
          onClose={closeCompetencePopup}
          currentItem={currentItem}
          onConnect={handleConnectAbilities}
          abilities={competenceProfile.abilities}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isDisconnectAbilitiesPopupOpen &&
        <DisconnectAbilityPopup
          isOpen={isDisconnectAbilitiesPopupOpen}
          onClose={closeCompetencePopup}
          onConfirm={handleDisconnectAbilities}
          currentItem={currentItem}
          currentAbility={currentAbility}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isEditAbilitiesPopupOpen &&
        <EditAbilityPopup
          isOpen={isEditAbilitiesPopupOpen} 
          onClose={closeCompetencePopup}
          currentItem={currentItem}
          currentAbility={currentAbility}
          onEdit={handleEditAbilities}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isRemoveAbilitiesPopupOpen &&
        <ConfirmRemovePopup
          isOpen={isRemoveAbilitiesPopupOpen}
          onClose={closeCompetencePopup}
          onConfirm={handleRemoveAbilities}
          item={currentAbility}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isAddKnowledgePopupOpen &&
        <AddKnowledgePopup
          isOpen={isAddKnowledgePopupOpen}
          onClose={closeCompetencePopup}
          currentItem={currentItem}
          onAdd={handleAddKnowledge}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isConnectKnowledgePopupOpen &&
        <ConnectKnowledgePopup
          isOpen={isConnectKnowledgePopupOpen}
          onClose={closeCompetencePopup}
          currentItem={currentItem}
          onConnect={handleConnectKnowledge}
          knowledges={competenceProfile.knowledges}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isDisconnectKnowledgePopupOpen &&
        <DisconnectKnowledgePopup
          isOpen={isDisconnectKnowledgePopupOpen}
          onClose={closeCompetencePopup}
          onConfirm={handleDisconnectKnowledge}
          currentItem={currentItem}
          currentKnowledge={currentKnowledge}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isEditKnowledgePopupOpen &&
        <EditKnowledgePopup
          isOpen={isEditKnowledgePopupOpen} 
          onClose={closeCompetencePopup}
          currentItem={currentItem}
          currentKnowledge={currentKnowledge}
          onEdit={handleEditKnowledge}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isRemoveKnowledgePopupOpen &&
        <ConfirmRemovePopup
          isOpen={isRemoveKnowledgePopupOpen}
          onClose={closeCompetencePopup}
          onConfirm={handleRemoveKnowledge}
          item={currentKnowledge}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }

    </>
  )
}

export default Competence; 
