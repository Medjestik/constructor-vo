import React from 'react';
import './Competence.css';
import * as competenceApi from '../../utils/competence.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import Levels from '../Levels/Levels.js';
import CompetenceProcessList from './CompetenceProcessList/CompetenceProcessList.js';
import CompetenceAbilityList from './CompetenceAbilityList/CompetenceAbilityList.js';
import CompetenceKnowledgeList from './CompetenceKnowledgeList/CompetenceKnowledgeList.js';
import AddAbilityPopup from './CompetencePopup/AddAbilityPopup/AddAbilityPopup.js';
import ConnectAbilityPopup from './CompetencePopup/ConnectAbilityPopup/ConnectAbilityPopup.js';
import DisconnectAbilityPopup from './CompetencePopup/DisconnectAbilityPopup/DisconnectAbilityPopup.js';
import EditAbilityPopup from './CompetencePopup/EditAbilityPopup/EditAbilityPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import WarningRemovePopup from '../Popup/WarningRemovePopup/WarningRemovePopup.js';
import AddKnowledgePopup from './CompetencePopup/AddKnowledgePopup/AddKnowledgePopup.js';
import ConnectKnowledgePopup from './CompetencePopup/ConnectKnowledgePopup/ConnectKnowledgePopup.js';
import DisconnectKnowledgePopup from './CompetencePopup/DisconnectKnowledgePopup/DisconnectKnowledgePopup.js';
import EditKnowledgePopup from './CompetencePopup/EditKnowledgePopup/EditKnowledgePopup.js'

function Competence({ currentProgram, isEditRights }) {

  const [processes, setProcesses] = React.useState([]);

  const [abilityBase, setAbilityBase] = React.useState([]);
  const [knowledgeBase, setKnowledgeBase] = React.useState([]);

  const [isShowAbilities, setIsShowAbilities] = React.useState(false);
  const [isShowKnowledge, setIsShowKnowledge] = React.useState(false);

  const [openProcess, setOpenProcess] = React.useState({});
  const [openAbility, setOpenAbility] = React.useState({});

  const [currentProcess, setCurrentProcess] = React.useState({});
  const [currentAbility, setCurrentAbility] = React.useState({});
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});

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

  function openAddAbilityPopup() {
    setIsAddAbilitiesPopupOpen(true);
  }

  function openConnectAbilitiesPopup() {
    setIsConnectAbilitiesPopupOpen(true);
  }

  function openDisconnectAbilitiesPopup(ability) {
    setCurrentAbility(ability);
    setIsDisconnectAbilitiesPopupOpen(true);
  }

  function openEditAbilityPopup(ability) {
    setCurrentAbility(ability);
    setIsEditAbilitiesPopupOpen(true);
  }

  function openRemoveAbilitiesPopup(ability) {
    setCurrentAbility(ability);
    setIsRemoveAbilitiesPopupOpen(true);
  }

  function openAddKnowledgePopup() {
    setIsAddKnowledgePopupOpen(true);
  }

  function openConnectKnowledgePopup() {
    setIsConnectKnowledgePopupOpen(true);
  }

  function openDisconnectKnowledgePopup(knowledge) {
    setCurrentKnowledge(knowledge);
    setIsDisconnectKnowledgePopupOpen(true);
  }

  function openEditKnowledgePopup(knowledge) {
    setCurrentKnowledge(knowledge);
    setIsEditKnowledgePopupOpen(true);
  }

  function openRemoveKnowledgePopup(knowledge) {
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

  function handleOpenProcess(data, i) {
    setOpenProcess({...data, code: i});
    setOpenAbility({});
    setIsShowAbilities(true);
    setIsShowKnowledge(false);
  }

  function handleOpenAbility(data, i) {
    setOpenAbility({...data, code: i});
    setIsShowKnowledge(true);
  }

  function getCompetenceProfile() {
    const token = localStorage.getItem('token');
    Promise.all([
      competenceApi.getCompetenceProcesses({ token: token, programId: currentProgram.id }),
      competenceApi.getAbilityBase({ token: token, programId: currentProgram.id }),
      competenceApi.getKnowledgeBase({ token: token, programId: currentProgram.id }),
    ])
      .then(([processes, ab, kn]) => {
        console.log('CompetenceProcesses:', processes);
        setProcesses(processes);
        setAbilityBase(ab);
        setKnowledgeBase(kn);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  function handleAddAbilities(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    if (token) {
      competenceApi.addAbility({ token, processId: openProcess.id, ability: item })
      .then((res) => {
        const findProcess = processes.find((elem) => (elem.id === openProcess.id));
        const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
        const newAbilities = [...findProcess.abilities, res];
        const newProcess = {...findProcess, abilities: newAbilities};
        setProcesses([...processes.slice(0, indexProcess), newProcess, ...processes.slice(indexProcess + 1)]);
        setOpenProcess(newProcess);
        setAbilityBase([...abilityBase, res]);
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
  }

  function handleConnectAbilities(abilityId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.connectAbilities({ token, processId: openProcess.id, abilityId: abilityId })
    .then((res) => {
      let newProcesses = processes;
      res.parent_id.forEach((item) => {
        const findProcess = processes.find((elem) => (elem.id === item));
        const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === item)));
        let newProcess = {};
        if (openProcess.id === item) {
          const newAbilities = [...findProcess.abilities, res];
          newProcess = {...findProcess, abilities: newAbilities};
          setOpenProcess(newProcess);
        } else {
          const findAbility = findProcess.abilities.find((elem) => (elem.id === res.id));
          const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === res.id)));
          const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, parent_id: res.parent_id}, ...findProcess.abilities.slice(indexAbility + 1)];
          newProcess = {...findProcess, abilities: newAbilities};
        }
        return newProcesses = [...newProcesses.slice(0, indexProcess), newProcess, ...newProcesses.slice(indexProcess + 1)];
      })
      setProcesses(newProcesses);
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

  function handleEditAbilities(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    if (token) {
      competenceApi.editAbilities({ token, programId: currentProgram.id, ability: item })
      .then((res) => {
        let newProcesses = processes;
        res.parent_id.forEach((item) => {
          const findProcess = processes.find((elem) => (elem.id === item));
          const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === item)));
          const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === res.id)));
          const newAbilities = [...findProcess.abilities.slice(0, indexAbility), res, ...findProcess.abilities.slice(indexAbility + 1)];
          const newProcess = {...findProcess, abilities: newAbilities};
          if (openProcess.id === item) {
            setOpenProcess(newProcess);
          }
          return newProcesses = [...newProcesses.slice(0, indexProcess), newProcess, ...newProcesses.slice(indexProcess + 1)];
        })
        setProcesses(newProcesses);
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
  }

  function handleDisconnectAbilities(ability) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.disconnectAbilities({ token, processId: openProcess.id, abilityId: ability.id })
      .then((res) => {
        let newProcesses = processes;
        res.parent_id.forEach((item) => {
          const findProcess = processes.find((elem) => (elem.id === item));
          const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === item)));
          let newProcess = {};
          const findAbility = findProcess.abilities.find((elem) => (elem.id === res.id));
          const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === res.id)));
          const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, parent_id: res.parent_id}, ...findProcess.abilities.slice(indexAbility + 1)];
          newProcess = {...findProcess, abilities: newAbilities};
          return newProcesses = [...newProcesses.slice(0, indexProcess), newProcess, ...newProcesses.slice(indexProcess + 1)];
        })
        const findProcess = processes.find((elem) => (elem.id === openProcess.id));
        const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
        const newAbilities = findProcess.abilities.filter((elem) => elem.id !== res.id);
        const newProcess = {...findProcess, abilities: newAbilities};
        setProcesses([...processes.slice(0, indexProcess), newProcess, ...processes.slice(indexProcess + 1)]);
        setOpenProcess({...findProcess, abilities: newAbilities});
        if (openAbility.id === res.id) {
          setIsShowKnowledge(false);
        }
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

  function handleRemoveAbilities(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    if (token) {
      competenceApi.removeAbilities({ token, programId: currentProgram.id, abilityId: item.id })
      .then((res) => {
        let newProcesses = processes;
        item.parent_id.forEach((item) => {
          const findProcess = processes.find((elem) => (elem.id === item));
          const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === item)));
          const newAbilities = findProcess.abilities.filter((elem) => elem.id !== res.id);
          const newProcess = {...findProcess, abilities: newAbilities};
          if (openProcess.id === item) {
            setOpenProcess(newProcess);
          }
          return newProcesses = [...newProcesses.slice(0, indexProcess), newProcess, ...newProcesses.slice(indexProcess + 1)];
        })
        setProcesses(newProcesses);
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
  }

  function handleAddKnowledge(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    if (token) {
      competenceApi.addKnowledge({ token, abilityId: openAbility.id, knowledge: item })
        .then((res) => {
          const findProcess = processes.find((elem) => (elem.id === openProcess.id));
          const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
          const findAbility = findProcess.abilities.find((elem) => (elem.id === openAbility.id));
          const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === openAbility.id)));
          const newKnowledges = [...findAbility.knowledges, res];
          const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, knowledges: newKnowledges}, ...findProcess.abilities.slice(indexAbility + 1)];
          setProcesses([...processes.slice(0, indexProcess), {...findProcess, abilities: newAbilities}, ...processes.slice(indexProcess + 1)]);
          //setAbilities(newAbilities);
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
  }

  function handleConnectKnowledge(knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.connectKnowledge({ token, abilityId: openAbility.id, knowledgeId: knowledgeId })
    .then((res) => {
      const findProcess = processes.find((elem) => (elem.id === openProcess.id));
      const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
      const findAbility = findProcess.abilities.find((elem) => (elem.id === openAbility.id));
      const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === openAbility.id)));
      const newKnowledges = [...findAbility.knowledges, res];
      const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, knowledges: newKnowledges}, ...findProcess.abilities.slice(indexAbility + 1)];
      setProcesses([...processes.slice(0, indexProcess), {...findProcess, abilities: newAbilities}, ...processes.slice(indexProcess + 1)]);
      setOpenProcess({...findProcess, abilities: newAbilities});
      //setAbilities(newAbilities);
      setOpenAbility({...findAbility, knowledges: newKnowledges});
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

  function handleEditKnowledge(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    if (token) {
      competenceApi.editKnowledge({ token, programId: currentProgram.id, knowledge: item })
      .then((res) => {
        const findProcess = processes.find((elem) => (elem.id === openProcess.id));
        const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
        const findAbility = findProcess.abilities.find((elem) => (elem.id === openAbility.id));
        const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === openAbility.id)));
        const indexKnowledge = findAbility.knowledges.indexOf(findAbility.knowledges.find((elem) => (elem.id === res.id)));
        const newKnowledges = [...findAbility.knowledges.slice(0, indexKnowledge), res, ...findAbility.knowledges.slice(indexKnowledge + 1)];
        const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, knowledges: newKnowledges}, ...findProcess.abilities.slice(indexAbility + 1)];
        setProcesses([...processes.slice(0, indexProcess), {...findProcess, abilities: newAbilities}, ...processes.slice(indexProcess + 1)]);
        //setAbilities(newAbilities);
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
  }

  function handleDisconnectKnowledge(item, knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.disconnectKnowledge({ token, abilityId: item.id, knowledgeId: knowledgeId })
    .then((res) => {
      const findProcess = processes.find((elem) => (elem.id === openProcess.id));
      const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
      const findAbility = findProcess.abilities.find((elem) => (elem.id === openAbility.id));
      const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === openAbility.id)));
      const newKnowledges = findAbility.knowledges.filter((elem) => elem.id !== res.id);
      const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, knowledges: newKnowledges}, ...findProcess.abilities.slice(indexAbility + 1)];
      setProcesses([...processes.slice(0, indexProcess), {...findProcess, abilities: newAbilities}, ...processes.slice(indexProcess + 1)]);
      //setAbilities(newAbilities);
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

  function handleRemoveKnowledge(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    if (token) {
      competenceApi.removeKnowledge({ token, programId: currentProgram.id, knowledgeId: item.id })
      .then((res) => {
        /*
        const findProcess = processes.find((elem) => (elem.id === openProcess.id));
        const indexProcess = processes.indexOf(processes.find((elem) => (elem.id === openProcess.id)));
        const findAbility = findProcess.abilities.find((elem) => (elem.id === openAbility.id));
        const indexAbility = findProcess.abilities.indexOf(findProcess.abilities.find((elem) => (elem.id === openAbility.id)));
        const newKnowledges = findAbility.knowledges.filter((elem) => elem.id !== res.id);
        const newAbilities = [...findProcess.abilities.slice(0, indexAbility), {...findAbility, knowledges: newKnowledges}, ...findProcess.abilities.slice(indexAbility + 1)];
        setProcesses([...processes.slice(0, indexProcess), {...findProcess, abilities: newAbilities}, ...processes.slice(indexProcess + 1)]);
        setAbilities(newAbilities);
        closeCompetencePopup();
        */
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
    }
  }

  React.useEffect(() => {
    getCompetenceProfile();
    return(() => {
      setProcesses([]);
      setAbilityBase([]);
      setKnowledgeBase([]);
      setOpenProcess({});
      setOpenAbility({});
      setCurrentProcess({});
      setCurrentAbility({});
      setCurrentKnowledge({});
      setIsShowRequestError({ isShow: false, text: '' });
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
        <Section title={'Компетентностный профиль'} heightType={'page'} headerType={'large'}>
          <Levels>
            <CompetenceProcessList 
              data={processes} 
              openProcess={openProcess} 
              onOpen={handleOpenProcess} 
            />
            {
              isShowAbilities 
              ?
              <CompetenceAbilityList
                openProcess={openProcess}
                openAbility={openAbility}
                onAdd={openAddAbilityPopup} 
                onOpen={handleOpenAbility} 
                onEdit={openEditAbilityPopup}
                onRemove={openRemoveAbilitiesPopup}
                onConnect={openConnectAbilitiesPopup}
                onDisconnect={openDisconnectAbilitiesPopup}
              />
              :
              <div className='level__tab'>
                <h3 className='levels__tab-title'>Умения</h3>
              </div>
            }
            {
              isShowKnowledge
              ?
              <CompetenceKnowledgeList
                openProcess={openProcess}
                openAbility={openAbility}
                onAdd={openAddKnowledgePopup} 
                onEdit={openEditKnowledgePopup}
                onRemove={openRemoveKnowledgePopup}
                onConnect={openConnectKnowledgePopup}
                onDisconnect={openDisconnectKnowledgePopup}
              />
              :
              <div className='level__tab'>
                <h3 className='levels__tab-title'>Знания</h3>
              </div>
            }
          </Levels>
        </Section>
      }
      {
        isAddAbilitiesPopupOpen &&
        <AddAbilityPopup
          isOpen={isAddAbilitiesPopupOpen}
          onClose={closeCompetencePopup}
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
          currentItem={openProcess}
          onConnect={handleConnectAbilities}
          abilityBase={abilityBase}
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
          currentAbility={currentAbility}
          onEdit={handleEditAbilities}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isRemoveAbilitiesPopupOpen &&
        <WarningRemovePopup
          isOpen={isRemoveAbilitiesPopupOpen}
          onClose={closeCompetencePopup}
          text={
            currentAbility.parent_id.length > 1
            ?
            'Вы пытаетесь удалить умение, которое привязано еще к ' + (currentAbility.parent_id.length - 1) + ' процессам. Вы действительно хотите это сделать?' 
            :
            'Вы действительно хотите удалить умение? Этот процесс нельзя будет отменить.'
          }
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
          currentItem={openAbility}
          onConnect={handleConnectKnowledge}
          knowledgeBase={knowledgeBase}
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
          currentItem={currentKnowledge}
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
