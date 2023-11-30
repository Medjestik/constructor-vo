import React from 'react';
import './Discipline.css';
import * as disciplineApi from '../../utils/discipline.js';
import * as competenceApi from '../../utils/competence.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import Levels from '../Levels/Levels.js';
import DisciplineList from './DisciplineList/DisciplineList.js';
import DisciplineAbilityList from './DisciplineAbilityList/DisciplineAbilityList.js';
import DisciplineKnowledgeList from './DisciplineKnowledgeList/DisciplineKnowledgeList.js';
import AddDisciplinePopup from './DisciplinePopup/AddDisciplinePopup/AddDisciplinePopup.js';
import EditDisciplinePopup from './DisciplinePopup/EditDisciplinePopup/EditDisciplinePopup.js';
import ConnectAbilityPopup from '../Competence/CompetencePopup/ConnectAbilityPopup/ConnectAbilityPopup.js';
import DisconnectAbilityPopup from '../Competence/CompetencePopup/DisconnectAbilityPopup/DisconnectAbilityPopup.js';
import ConnectKnowledgePopup from '../Competence/CompetencePopup/ConnectKnowledgePopup/ConnectKnowledgePopup.js';
import DisconnectKnowledgePopup from '../Competence/CompetencePopup/DisconnectKnowledgePopup/DisconnectKnowledgePopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function Discipline({ currentProgram, isEditRights }) {

  const [disciplines, setDisciplines] = React.useState({});
  const [abilityBase, setAbilityBase] = React.useState([]);
  const [knowledgeBase, setKnowledgeBase] = React.useState([]);

  const [openDiscipline, setOpenDiscipline] = React.useState({});

  const [currentDiscipline, setCurrentDiscipline] = React.useState({});
  const [currentAbility, setCurrentAbility] = React.useState({});
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});

  const [isOpenDiscipline, setIsOpenDiscipline] = React.useState(false);

  const [isOpenAddDisciplinePopup, setIsOpenAddDisciplinePopup] = React.useState(false);
  const [isOpenEditDisciplinePopup, setIsOpenEditDisciplinePopup] = React.useState(false);
  const [isOpenRemoveDisciplinePopup, setIsOpenRemoveDisciplinePopup] = React.useState(false);
  const [isConnectAbilityPopupOpen, setIsConnectAbilityPopupOpen] = React.useState(false);
  const [isDisconnectAbilityPopupOpen, setIsDisconnectAbilityPopupOpen] = React.useState(false);
  const [isConnectKnowledgePopupOpen, setIsConnectKnowledgePopupOpen] = React.useState(false);
  const [isDisconnectKnowledgePopupOpen, setIsDisconnectKnowledgePopupOpen] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' }); 
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function openAddDisciplinePopup() {
    setIsOpenAddDisciplinePopup(true);
  }

  function openEditDisciplinePopup(item) {
    setCurrentDiscipline(item);
    setIsOpenEditDisciplinePopup(true);
  }

  function openRemoveDisciplinePopup(item) {
    setCurrentDiscipline(item);
    setIsOpenRemoveDisciplinePopup(true);
  }

  function openConnectAbilityPopup() {
    setIsConnectAbilityPopupOpen(true);
  }

  function openDisconnectAbilityPopup(ability) {
    setCurrentAbility(ability);
    setIsDisconnectAbilityPopupOpen(true);
  }

  function openConnectKnowledgePopup() {
    setIsConnectKnowledgePopupOpen(true);
  }

  function openDisconnectKnowledgePopup(knowledge) {
    setCurrentKnowledge(knowledge);
    setIsDisconnectKnowledgePopupOpen(true);
  }

  function closeDisciplinePopup() {
    setIsOpenAddDisciplinePopup(false);
    setIsOpenEditDisciplinePopup(false);
    setIsOpenRemoveDisciplinePopup(false);
    setIsConnectAbilityPopupOpen(false);
    setIsDisconnectAbilityPopupOpen(false);
    setIsConnectKnowledgePopupOpen(false);
    setIsDisconnectKnowledgePopupOpen(false);
    setIsLoadingRequest(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function getDiscipline() {
    const token = localStorage.getItem('token');
    Promise.all([
      disciplineApi.getDiscipline({ token: token, programId: currentProgram.id }),
      competenceApi.getAbilityBase({ token: token, programId: currentProgram.id }),
      competenceApi.getKnowledgeBase({ token: token, programId: currentProgram.id }),
    ])
      .then(([discipline, abilities, knowledges]) => {
        console.log('Discipline:', discipline);
        setDisciplines(discipline);
        setAbilityBase(abilities);
        setKnowledgeBase(knowledges);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  function handleAddDiscipline(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.addDiscipline({ token: token, programId: currentProgram.id, discipline: item })
      .then((res) => {
        setDisciplines([...disciplines, res]);
        handleOpenDiscipline(res);
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditDiscipline(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.editDiscipline({ token: token, programId: currentProgram.id, discipline: item })
      .then((res) => {
        const updatedDisciplines = disciplines.map((discipline) => discipline.id === res.id ? res : discipline);
        setDisciplines(updatedDisciplines);
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveDiscipline(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.removeDiscipline({ token: token, programId: currentProgram.id, discipline: item })
      .then((res) => {
        const updatedDisciplines = disciplines.filter((elem) => elem.id !== res.id);
        const updatedAbilities = abilityBase.map((ability) => {
          return ability.discipline_id.includes(res.id) ? { ...ability, discipline_id: ability.discipline_id.filter((id) => id !== res.id) } : ability;
        });
        const updatedKnowledges = knowledgeBase.map((knowledge) => {
          return knowledge.discipline_id.includes(res.id) ? { ...knowledge, discipline_id: knowledge.discipline_id.filter((id) => id !== res.id) } : knowledge;
        });
        setDisciplines(updatedDisciplines);
        setAbilityBase(updatedAbilities);
        setKnowledgeBase(updatedKnowledges);
        handleCloseDiscipline();
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleConnectAbility(abilityId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.connectAbility({ token: token, disciplineId: openDiscipline.id, abilityId: abilityId })
      .then((res) => {
        const updatedDisciplines = disciplines.map((discipline) => {
          if (discipline.id === openDiscipline.id) {
            const updateAbilities = [...discipline.abilities, res];
            const uniqKnowledges = res.knowledges.filter((knowledge) => !discipline.knowledges.some((disciplineKnowledge) => disciplineKnowledge.id === knowledge.id));
            const updateKnowledges = [...discipline.knowledges, ...uniqKnowledges];
            const updatedDiscipline = {...discipline, abilities: updateAbilities, knowledges: updateKnowledges};
            setOpenDiscipline(updatedDiscipline);
            return updatedDiscipline;
          }
          return discipline;
        });
        const updatedAbilities = abilityBase.map((ability) => {
          return ability.id === res.id ? { ...ability, discipline_id: res.discipline_id, } : ability;
        });
        const updatedKnowledges = knowledgeBase.map((knowledge) => {
          const findKnowledge = res.knowledges.find((elem) => elem.id === knowledge.id);
          return findKnowledge ? { ...knowledge, discipline_id: findKnowledge.discipline_id } : knowledge;
        });
        setAbilityBase(updatedAbilities);
        setKnowledgeBase(updatedKnowledges);
        setDisciplines(updatedDisciplines);
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleDisconnectAbility(abilityId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.disconnectAbility({ token: token, disciplineId: openDiscipline.id,abilityId: abilityId })
      .then((res) => {
        const updatedDisciplines = disciplines.map((discipline) => {
          if (discipline.id === openDiscipline.id) {
            const updateAbilities = discipline.abilities.filter((ability) => ability.id !== res.id);
            const updatedDiscipline = {...discipline, abilities: updateAbilities};
            setOpenDiscipline(updatedDiscipline);
            return updatedDiscipline;
          }
          return discipline;
        });
        const updatedAbilities = abilityBase.map((ability) => {
          return ability.id === res.id ? { ...ability, discipline_id: res.discipline_id, } : ability;
        });
        setAbilityBase(updatedAbilities);
        setDisciplines(updatedDisciplines);
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleConnectKnowledge(knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.connectKnowledge({ token: token, disciplineId: openDiscipline.id, knowledgeId: knowledgeId })
      .then((res) => {
        const updatedDisciplines = disciplines.map((discipline) => {
          if (discipline.id === openDiscipline.id) {
            const updateKnowledges = [...discipline.knowledges, res];
            const updatedDiscipline = {...discipline, knowledges: updateKnowledges};
            setOpenDiscipline(updatedDiscipline);
            return updatedDiscipline;
          }
          return discipline;
        });
        const updatedKnowledges = knowledgeBase.map((knowledge) => {
          return knowledge.id === res.id ? { ...knowledge, discipline_id: res.discipline_id, } : knowledge;
        });
        setKnowledgeBase(updatedKnowledges);
        setCurrentDiscipline(updatedDisciplines);
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleDisconnectKnowledge(knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.disconnectKnowledge({ token: token, disciplineId: openDiscipline.id, knowledgeId: knowledgeId })
      .then((res) => {
        const updatedDisciplines = disciplines.map((discipline) => {
          if (discipline.id === openDiscipline.id) {
            const updateKnowledges = discipline.knowledges.filter((knowledge) => knowledge.id !== res.id);
            const updatedDiscipline = {...discipline, knowledges: updateKnowledges};
            setOpenDiscipline(updatedDiscipline);
            return updatedDiscipline;
          }
          return discipline;
        })
        const updatedKnowledges = knowledgeBase.map((knowledge) => {
          return knowledge.id === res.id ? { ...knowledge, discipline_id: res.discipline_id, } : knowledge;
        });
        setKnowledgeBase(updatedKnowledges);
        setDisciplines(updatedDisciplines);
        closeDisciplinePopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleOpenDiscipline(item) {
    setOpenDiscipline(item);
    setIsOpenDiscipline(true);
  }

  function handleCloseDiscipline() {
    setOpenDiscipline({});
    setIsOpenDiscipline(false);
  }

  React.useEffect(() => {
    getDiscipline();
    return(() => {
      setDisciplines({});
      setAbilityBase([]);
      setKnowledgeBase([]);
      setOpenDiscipline({});
      setCurrentDiscipline({});
      setCurrentKnowledge({})
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
      <Section title={'Проектирование дисциплин'} heightType={'page'} headerType={'large'}>
        <Levels>
          <DisciplineList
            data={disciplines} 
            openDiscipline={openDiscipline} 
            onOpen={handleOpenDiscipline} 
            onClose={handleCloseDiscipline}
            onAdd={openAddDisciplinePopup}
            onEdit={openEditDisciplinePopup}
            onRemove={openRemoveDisciplinePopup}
          />

          <DisciplineAbilityList
            data={openDiscipline.abilities}
            disciplineList={disciplines}
            abilityBase={abilityBase}
            isOpenDiscipline={isOpenDiscipline}
            onAdd={openConnectAbilityPopup}
            onDisconnect={openDisconnectAbilityPopup}
          />

          <DisciplineKnowledgeList
            data={openDiscipline.knowledges}
            disciplineList={disciplines}
            knowledgeBase={knowledgeBase}
            isOpenDiscipline={isOpenDiscipline}
            onAdd={openConnectKnowledgePopup}
            onDisconnect={openDisconnectKnowledgePopup}
          />
        </Levels>
      </Section>
    }
    {
      isOpenAddDisciplinePopup &&
      <AddDisciplinePopup
        isOpen={isOpenAddDisciplinePopup} 
        onClose={closeDisciplinePopup}
        onAdd={handleAddDiscipline}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenEditDisciplinePopup &&
      <EditDisciplinePopup
        isOpen={isOpenEditDisciplinePopup} 
        onClose={closeDisciplinePopup}
        onEdit={handleEditDiscipline}
        currentDiscipline={currentDiscipline}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenRemoveDisciplinePopup &&
      <ConfirmRemovePopup
        isOpen={isOpenRemoveDisciplinePopup}
        onClose={closeDisciplinePopup}
        onConfirm={handleRemoveDiscipline}
        item={currentDiscipline}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isConnectAbilityPopupOpen &&
      <ConnectAbilityPopup
        isOpen={isConnectAbilityPopupOpen}
        onClose={closeDisciplinePopup}
        programId={currentProgram.id}
        currentItem={openDiscipline}
        onConnect={handleConnectAbility}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isDisconnectAbilityPopupOpen &&
      <DisconnectAbilityPopup
        isOpen={isDisconnectAbilityPopupOpen}
        onClose={closeDisciplinePopup}
        onConfirm={handleDisconnectAbility}
        currentItem={openDiscipline}
        currentAbility={currentAbility}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isConnectKnowledgePopupOpen &&
      <ConnectKnowledgePopup
        isOpen={isConnectKnowledgePopupOpen}
        onClose={closeDisciplinePopup}
        programId={currentProgram.id}
        currentItem={openDiscipline}
        onConnect={handleConnectKnowledge}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isDisconnectKnowledgePopupOpen &&
      <DisconnectKnowledgePopup
        isOpen={isDisconnectKnowledgePopupOpen}
        onClose={closeDisciplinePopup}
        onConfirm={handleDisconnectKnowledge}
        currentItem={openDiscipline}
        currentKnowledge={currentKnowledge}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    </>
  )
}

export default Discipline; 