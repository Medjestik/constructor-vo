import React from 'react';
import './Discipline.css';
import * as disciplineApi from '../../utils/discipline';
import Preloader from '../Preloader/Preloader.js';
import Search from '../Search/Search.js';
import DisciplineKnowledgeTable from './DisciplineKnowledgeTable/DisciplineKnowledgeTable.js';
import AddDisciplinePopup from './DisciplinePopup/AddDisciplinePopup/AddDisciplinePopup.js';
import EditDisciplinePopup from './DisciplinePopup/EditDisciplinePopup/EditDisciplinePopup.js';
import ConnectKnowledgePopup from '../Competence/CompetencePopup/ConnectKnowledgePopup/ConnectKnowledgePopup.js';
import DisconnectKnowledgePopup from '../Competence/CompetencePopup/DisconnectKnowledgePopup/DisconnectKnowledgePopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function Discipline({ currentProgram, isEditRights }) {

  const [discipline, setDiscipline] = React.useState({});
  const [filteredDisciplines, setFilteredDisciplines] = React.useState([]);

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

  const [currentDiscipline, setCurrentDiscipline] = React.useState({});
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});

  const [isShowKnowledge, setIsShowKnowledge] = React.useState(false);

  const [isOpenAddDisciplinePopup, setIsOpenAddDisciplinePopup] = React.useState(false);
  const [isOpenEditDisciplinePopup, setIsOpenEditDisciplinePopup] = React.useState(false);
  const [isOpenRemoveDisciplinePopup, setIsOpenRemoveDisciplinePopup] = React.useState(false);
  const [isConnectKnowledgePopupOpen, setIsConnectKnowledgePopupOpen] = React.useState(false);
  const [isDisconnectKnowledgePopupOpen, setIsDisconnectKnowledgePopupOpen] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' }); 
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function handleSearch(data) {
    setFilteredDisciplines(data);
  }

  function openAddDisciplinePopup() {
    setIsOpenAddDisciplinePopup(true);
  }

  function openEditDisciplinePopup() {
    setIsOpenEditDisciplinePopup(true);
  }

  function openRemoveDisciplinePopup() {
    setIsOpenRemoveDisciplinePopup(true);
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
    setIsConnectKnowledgePopupOpen(false);
    setIsDisconnectKnowledgePopupOpen(false);
    setIsLoadingRequest(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function chooseItem(discipline, disciplineIndex) {
    setCurrentDiscipline({...discipline, disciplineIndex: disciplineIndex});
    setIsShowKnowledge(true);
  }

  function getDiscipline() {
    const token = localStorage.getItem('token');
    Promise.all([
      disciplineApi.getDiscipline({ token, programId: currentProgram.id }),
    ])
      .then(([discipline]) => {
        console.log('Discipline:', discipline);
        setDiscipline(discipline.data);
        setFilteredDisciplines(discipline.data.disciplines);
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
    disciplineApi.addDiscipline({ token, programId: currentProgram.id, discipline: item })
      .then((res) => {
        setDiscipline({...discipline, disciplines: [...discipline.disciplines, res.data]});
        setFilteredDisciplines([...discipline.disciplines, res.data]);
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
    disciplineApi.editDiscipline({ token, programId: currentProgram.id, discipline: item })
      .then((res) => {
        const index = discipline.disciplines.indexOf(discipline.disciplines.find((elem) => (elem.id === res.data.id)));
        const newDisciplines = [...discipline.disciplines.slice(0, index), res.data, ...discipline.disciplines.slice(index + 1)];
        setDiscipline({
          ...discipline, 
          disciplines: newDisciplines,
        });
        setFilteredDisciplines(newDisciplines);
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
    disciplineApi.removeDiscipline({ token, programId: currentProgram.id, discipline: item })
      .then((res) => {
        const newDisciplines = discipline.disciplines.filter((elem) => elem.id !== res);
        setDiscipline({...discipline, disciplines: newDisciplines});
        setFilteredDisciplines(newDisciplines);
        setCurrentDiscipline({});
        setIsShowKnowledge(false);
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

  function handleConnectKnowledge(item, knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.connectKnowledge({ token, disciplineId: item.id, knowledgeId: knowledgeId })
      .then((res) => {
        const index = discipline.disciplines.indexOf(discipline.disciplines.find((elem) => (elem.id === res.data.id)));
        const newDisciplines = [...discipline.disciplines.slice(0, index), res.data, ...discipline.disciplines.slice(index + 1)];
        setDiscipline({
          ...discipline, 
          disciplines: newDisciplines,
        });
        setDiscipline({...discipline, disciplines: newDisciplines});
        setFilteredDisciplines(newDisciplines);
        setCurrentDiscipline(res.data);
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

  function handleDisconnectKnowledge(item, knowledgeId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    disciplineApi.disconnectKnowledge({ token, disciplineId: item.id, knowledgeId: knowledgeId })
      .then((res) => {
        const index = discipline.disciplines.indexOf(discipline.disciplines.find((elem) => (elem.id === res.data.id)));
        const newDisciplines = [...discipline.disciplines.slice(0, index), res.data, ...discipline.disciplines.slice(index + 1)];
        setDiscipline({
          ...discipline, 
          disciplines: newDisciplines,
        });
        setDiscipline({...discipline, disciplines: newDisciplines});
        setFilteredDisciplines(newDisciplines);
        setCurrentDiscipline(res.data);
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

  React.useEffect(() => {
    getDiscipline();
    return(() => {
      setDiscipline({});
      setFilteredDisciplines({});
      setCurrentDiscipline({});
      setCurrentKnowledge({})
      setIsShowKnowledge(false);
    })
    // eslint-disable-next-line
  }, []);


  return (
    <div className='discipline'>
      {
        isLoadingPage 
        ?
        <Preloader />
        :
        <>
        <div className='section__header'>
          <Search type='medium' id='discipline' data={discipline.disciplines} onSearch={handleSearch} />
          <div className='section__header-btn-container'>
            <button className='section__header-btn' type='button' onClick={openAddDisciplinePopup}>Создать дисциплину</button>
            <button
              className={`btn btn_type_gear ${isShowKnowledge ? 'btn_type_gear_status_active' : ''} section__header-btn_margin_left`}
              onClick={openEditDisciplinePopup}
            >
            </button>
            <button
              className={`btn btn_type_cancel ${isShowKnowledge ? 'btn_type_cancel_status_active' : ''} section__header-btn_margin_left`}
              onClick={openRemoveDisciplinePopup}
            >
            </button>
          </div>
        </div>
        <div className='competence-container'>
          <div ref={containerHeightRef} className='competence-container_type_left'>
            <h3 className='competence-header__caption'>Список дисциплин:</h3>
            <div style={Object.assign({}, listStyle)} className='competence-container_type_scroll scroll'>
              <ul className='competence__list'>
                {
                  filteredDisciplines.length > 0 &&
                  filteredDisciplines.map((discipline, disciplineIndex) => (
                    <li className='competence-list__item' key={disciplineIndex}>
                      <p 
                      className={`competence-list__name competence-list__name_type_active ${isShowKnowledge && discipline.id === currentDiscipline.id ? 'competence-list__name_weight_bold competence-list__name_type_discipline' : ''}`} 
                      onClick={() => chooseItem(discipline, disciplineIndex)}
                      >
                        <span className='competence-list__name_weight_bold competence-list__name_type_discipline'>Дисциплина {disciplineIndex + 1}: </span> 
                        {discipline.name}
                      </p>
                      <ul className='competence__list competence__list_padding_left'>
                        {
                          discipline.knowledges.length > 0 &&
                          discipline.knowledges.map((knowledge, knowledgeIndex) => (
                            <li className='competence-list__item' key={knowledgeIndex}>
                              <p className='competence-list__name'>
                                <span className='competence-list__name_weight_bold competence-list__name_type_knowledge'>Знание {disciplineIndex + 1}.{knowledgeIndex + 1}: </span>
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
            <h3 className='competence-header__caption'>Проектирование дисциплин:</h3>
            {
              isShowKnowledge
              ?
              <>
              <p className='competence-list__name'><span className='competence-list__name_weight_bold competence-list__name_type_discipline'>Дисциплина {currentDiscipline.disciplineIndex + 1}:</span> {currentDiscipline.name}</p>
              <div className='section__header section__header_margin_top'>
                <button className='section__header-btn' type='button' onClick={openConnectKnowledgePopup}>Добавить знание</button>
              </div>
              <DisciplineKnowledgeTable 
                currentItem={currentDiscipline}
                onDisconnectKnowledge={openDisconnectKnowledgePopup}
              />
              </>
              :
              <p className='competence-list__name_type_empty'>Выберите умение..</p>
            }
          </div>
        </div>
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
          isConnectKnowledgePopupOpen &&
          <ConnectKnowledgePopup
            isOpen={isConnectKnowledgePopupOpen}
            onClose={closeDisciplinePopup}
            currentItem={currentDiscipline}
            onConnect={handleConnectKnowledge}
            knowledges={discipline.knowledges}
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
            currentItem={currentDiscipline}
            currentKnowledge={currentKnowledge}
            isShowRequestError={isShowRequestError}
            isLoadingRequest={isLoadingRequest}
          />
        }
        </>
      }
    </div>
  )
}

export default Discipline; 