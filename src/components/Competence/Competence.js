import React from 'react';
import './Competence.css';
import * as competenceApi from '../../utils/competence.js';
import { COMPETENCE_SECTION_OPTIONS } from '../../utils/config.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import Levels from '../Levels/Levels.js';
import CompetenceProcessLevel from './CompetenceProcessLevel/CompetenceProcessLevel.js';
import CompetenceAbilityLevel from './CompetenceAbilityLevel/CompetenceAbilityLevel.js';
import CompetenceKnowledgeLevel from './CompetenceKnowledgeLevel/CompetenceKnowledgeLevel.js';
import AddAbilityPopup from './CompetencePopup/AddAbilityPopup/AddAbilityPopup.js';
import ConnectAbilityPopup from './CompetencePopup/ConnectAbilityPopup/ConnectAbilityPopup.js';
import DisconnectAbilityPopup from './CompetencePopup/DisconnectAbilityPopup/DisconnectAbilityPopup.js';
import EditAbilityPopup from './CompetencePopup/EditAbilityPopup/EditAbilityPopup.js';
import AddKnowledgePopup from './CompetencePopup/AddKnowledgePopup/AddKnowledgePopup.js';
import ConnectKnowledgePopup from './CompetencePopup/ConnectKnowledgePopup/ConnectKnowledgePopup.js';
import DisconnectKnowledgePopup from './CompetencePopup/DisconnectKnowledgePopup/DisconnectKnowledgePopup.js';
import EditKnowledgePopup from './CompetencePopup/EditKnowledgePopup/EditKnowledgePopup.js'
import WarningRemovePopup from '../Popup/WarningRemovePopup/WarningRemovePopup.js';
import InfoPopup from '../Popup/InfoPopup/InfoPopup.js';

function Competence({ currentProgram, isEditRights }) {

  const [sectionOptions, setSectionOptions] = React.useState(COMPETENCE_SECTION_OPTIONS);

  const [processes, setProcesses] = React.useState([]);

  const [isShowAbilities, setIsShowAbilities] = React.useState(false);
  const [isShowKnowledge, setIsShowKnowledge] = React.useState(false);

  const [openProcess, setOpenProcess] = React.useState({});
  const [openAbility, setOpenAbility] = React.useState({});

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

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState({ isShow: false, title: '', text: '' });

  function handleChooseOption(option) {
    console.log(option);
    //navigate('/program/' + currentProgram.id + '/discipline' + option.link);
  }

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

  function openInfoPopup(title, text) {
    setIsOpenInfoPopup({ isShow: true, title, text });
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup({ isShow: false, title: '', text: '' });
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
    ])
      .then(([processes, kn]) => {
        console.log('CompetenceProcesses:', processes);
        setProcesses(processes);
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
        const updatedProcesses = processes.map((process) => {
          if (process.id === openProcess.id) {
            const updatedProcess = { ...process, abilities: [...process.abilities, res] };
            setOpenProcess({ ...updatedProcess, code: processes.indexOf(process) + 1 });
            setOpenAbility(res);
            return updatedProcess;
          }
          return process;
        });
        setProcesses(updatedProcesses);
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
      const updatedProcesses = processes.map((process) => {
        if (res.parent_id.includes(process.id)) {
          if (openProcess.id === process.id) {
            const updatedProcess = {...process, abilities: [...process.abilities, res]};
            setOpenProcess({ ...updatedProcess, code: processes.indexOf(process) + 1 });
            return updatedProcess;
          } else {
            const findAbility = process.abilities.find((ability) => ability.id === res.id);
            const indexAbility = process.abilities.indexOf(findAbility);
            const newAbilities = [...process.abilities.slice(0, indexAbility), { ...findAbility, parent_id: res.parent_id }, ...process.abilities.slice(indexAbility + 1)];
            const updatedProcess = { ...process, abilities: newAbilities };
            return updatedProcess;
          }
        }
        return process;
      });
      setProcesses(updatedProcesses);
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
        const updatedProcesses = processes.map((process) => {
          if (res.parent_id.includes(process.id)) {
            const updatedAbilities = process.abilities.map((ability) => {
              if (ability.id === res.id) {
                return res;
              }
              return ability;
            });
            const updatedProcess = { ...process, abilities: updatedAbilities };
            if (openProcess.id === process.id) {
              setOpenProcess({ ...updatedProcess, code: processes.indexOf(process) + 1 });
            }
            return updatedProcess;
          }
          return process;
        });
        setProcesses(updatedProcesses);
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

  function handleDisconnectAbilities(abilityId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.disconnectAbilities({ token, processId: openProcess.id, abilityId: abilityId })
      .then((res) => {
        const newProcesses = processes.map((process) => {
          if (res.parent_id.includes(process.id)) {
            const findAbility = process.abilities.find((ability) => ability.id === res.id);
            const indexAbility = process.abilities.indexOf(findAbility);
            const newAbilities = [...process.abilities.slice(0, indexAbility), { ...findAbility, parent_id: res.parent_id }, ...process.abilities.slice(indexAbility + 1)];
            const updatedProcess = { ...process, abilities: newAbilities };
            return updatedProcess;
          } else if (process.abilities.some(ability => ability.id === res.id)) {
            const newAbilities = process.abilities.filter((ability) => ability.id !== res.id);
            setOpenProcess({ ...process, code: processes.indexOf(process) + 1, abilities: newAbilities });
            const updatedProcess = { ...process, abilities: newAbilities };
            return updatedProcess;
          }
          return process;
        });
        setProcesses(newProcesses);
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
        const newProcesses = processes.map((process) => {
          if (item.parent_id.includes(process.id)) {
            const newAbilities = process.abilities.filter((ability) => ability.id !== res.id);
            const updatedProcess = { ...process, abilities: newAbilities };
            if (openProcess.id === process.id) {
              setOpenProcess({ ...updatedProcess, code: processes.indexOf(process) + 1 });
              setIsShowKnowledge(false);
            }
            return updatedProcess;
          }
          return process;
        });
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
          const findProcess = processes.find((elem) => elem.id === openProcess.id);
          const findAbility = findProcess.abilities.find((elem) => elem.id === openAbility.id);
          const newKnowledges = [...findAbility.knowledges, res];
          const newAbility = { ...findAbility, knowledges: newKnowledges };
          const newAbilities = findProcess.abilities.map((ability) => (ability.id === openAbility.id ? newAbility : ability));
          const newProcess = { ...findProcess, abilities: newAbilities };
          const updatedProcesses = processes.map((process) => (process.id === openProcess.id ? newProcess : process));
          setProcesses(updatedProcesses);
          setOpenProcess({ ...newProcess, code: updatedProcesses.indexOf(newProcess) + 1 });
          setOpenAbility({...newAbility, code: newProcess.abilities.indexOf(newAbility) + 1 });
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
      const updatedProcesses = processes.map((process) => {
        const updatedAbilities = process.abilities.map((ability) => {
          if (res.parent_id.includes(ability.id)) {
            if (openAbility.id === ability.id) {
              const updatedKnowledges = [...ability.knowledges, res];
              const updatedAbility = {...ability, knowledges: updatedKnowledges};
              const findAbility = process.abilities.find((elem) => elem.id === openAbility.id);
              setOpenAbility({...updatedAbility, code: process.abilities.indexOf(findAbility) + 1});
              return updatedAbility;
            } else {
              const updatedKnowledges = ability.knowledges.map(knowledge => knowledge.id === res.id ? {...knowledge, parent_id: res.parent_id} : knowledge);
              const updatedAbility = {...ability, knowledges: updatedKnowledges};
              return updatedAbility;
            }
          }
          return ability;
        })
        const updatedProcess = {...process, abilities: updatedAbilities};
        if (openProcess.id === process.id) {
          const findProcess = processes.find((elem) => elem.id === openProcess.id);
          setOpenProcess({ ...updatedProcess, code: processes.indexOf(findProcess) + 1});
        }
        return updatedProcess;
      })
      setProcesses(updatedProcesses);
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
        const updatedProcesses = processes.map((process) => {
          const updatedAbilities = process.abilities.map((ability) => {
            if (item.parent_id.includes(ability.id)) {
              const updatedKnowledges = ability.knowledges.map(knowledge => knowledge.id === res.id ? res : knowledge);
              const updatedAbility = {...ability, knowledges: updatedKnowledges};
              if (openAbility.id === ability.id) {
                const findAbility = process.abilities.find((elem) => elem.id === openAbility.id);
                setOpenAbility({...updatedAbility, code: process.abilities.indexOf(findAbility) + 1});
              }
              return updatedAbility;
            }
            return ability;
          })
          const updatedProcess = {...process, abilities: updatedAbilities};
          if (openProcess.id === process.id) {
            const findProcess = processes.find((elem) => elem.id === openProcess.id);
            setOpenProcess({ ...updatedProcess, code: processes.indexOf(findProcess) + 1});
          }
          return updatedProcess;
        })
        setProcesses(updatedProcesses);
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

  function handleDisconnectKnowledge(knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    competenceApi.disconnectKnowledge({ token, abilityId: openAbility.id, knowledgeId: knowledgeId })
    .then((res) => {
      const updatedProcesses = processes.map((process) => {
        const updatedAbilities = process.abilities.map((ability) => {
          if (openAbility.id === ability.id) {
            const updatedKnowledges = ability.knowledges.filter(knowledge => knowledge.id !== res.id);
            const updatedAbility = {...ability, knowledges: updatedKnowledges};
            const findAbility = process.abilities.find((elem) => elem.id === openAbility.id);
            setOpenAbility({...updatedAbility, code: process.abilities.indexOf(findAbility) + 1});
            return updatedAbility;
          }
          if (res.parent_id.includes(ability.id)) {
            const updatedKnowledges = ability.knowledges.map(knowledge => knowledge.id === res.id ? {...knowledge, parent_id: res.parent_id} : knowledge);
            const updatedAbility = {...ability, knowledges: updatedKnowledges};
            return updatedAbility;
          }
          return ability;
        })
        const updatedProcess = {...process, abilities: updatedAbilities};
        if (openProcess.id === process.id) {
          const findProcess = processes.find((elem) => elem.id === openProcess.id);
          setOpenProcess({ ...updatedProcess, code: processes.indexOf(findProcess) + 1});
        }
        return updatedProcess;
      })
      setProcesses(updatedProcesses);
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
        const updatedProcesses = processes.map((process) => {
          const updatedAbilities = process.abilities.map((ability) => {
            const updatedKnowledges = ability.knowledges.filter(knowledge => knowledge.id !== res.id);
            const updatedAbility = {...ability, knowledges: updatedKnowledges};
            if (openAbility.id === ability.id) {
              const findAbility = process.abilities.find((elem) => elem.id === openAbility.id);
              setOpenAbility({...updatedAbility, code: process.abilities.indexOf(findAbility) + 1});
            }
            return updatedAbility;
          })
          const updatedProcess = {...process, abilities: updatedAbilities};
          if (openProcess.id === process.id) {
            const findProcess = processes.find((elem) => elem.id === openProcess.id);
            setOpenProcess({ ...updatedProcess, code: processes.indexOf(findProcess) + 1});
          }
          return updatedProcess;
        })
        setProcesses(updatedProcesses);
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

  React.useEffect(() => {
    getCompetenceProfile();
    return(() => {
      setProcesses([]);
      setOpenProcess({});
      setOpenAbility({});
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
        <Section 
        title={'Компетентностный профиль'} 
        options={sectionOptions} 
        onChooseOption={handleChooseOption} 
        heightType={'page'} 
        headerType={'large'} 
        >
          <Levels direction={'row'}>
            <CompetenceProcessLevel
              data={processes} 
              openProcess={openProcess} 
              onOpen={handleOpenProcess} 
              onInfo={openInfoPopup}
            />
            {
              isShowAbilities 
              ?
              <CompetenceAbilityLevel
                openProcess={openProcess}
                openAbility={openAbility}
                onAdd={openAddAbilityPopup} 
                onOpen={handleOpenAbility} 
                onEdit={openEditAbilityPopup}
                onRemove={openRemoveAbilitiesPopup}
                onConnect={openConnectAbilitiesPopup}
                onDisconnect={openDisconnectAbilitiesPopup}
                onInfo={openInfoPopup}
              />
              :
              <div className='level__tab'>
                <h3 className='levels__tab-title'>Умения</h3>
              </div>
            }
            {
              isShowKnowledge
              ?
              <CompetenceKnowledgeLevel
                openProcess={openProcess}
                openAbility={openAbility}
                onAdd={openAddKnowledgePopup} 
                onEdit={openEditKnowledgePopup}
                onRemove={openRemoveKnowledgePopup}
                onConnect={openConnectKnowledgePopup}
                onDisconnect={openDisconnectKnowledgePopup}
                onInfo={openInfoPopup}
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
          programId={currentProgram.id}
          currentItem={openProcess}
          itemType={'process'}
          onConnect={handleConnectAbilities}
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
          programId={currentProgram.id}
          currentItem={openAbility}
          itemType={'process'}
          onConnect={handleConnectKnowledge}
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
        <WarningRemovePopup
          isOpen={isRemoveKnowledgePopupOpen}
          onClose={closeCompetencePopup}
          text={
            currentKnowledge.parent_id.length > 1
            ?
            'Вы пытаетесь удалить знание, которое привязано еще к ' + (currentKnowledge.parent_id.length - 1) + ' умениям. Вы действительно хотите это сделать?' 
            :
            'Вы действительно хотите удалить знание? Этот процесс нельзя будет отменить.'
          }
          onConfirm={handleRemoveKnowledge}
          item={currentKnowledge}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }

      {
        isOpenInfoPopup.isShow &&
        <InfoPopup
          isOpen={isOpenInfoPopup.isShow} 
          onClose={closeInfoPopup} 
          title={isOpenInfoPopup.title}
          text={isOpenInfoPopup.text}
        />
      }

    </>
  )
}

export default Competence; 
