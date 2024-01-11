import React from 'react';
import './ProgramInfo.css';
import * as usersApi from '../../../utils/api.js';
import * as programApi from '../../../utils/program.js';
import { PROGRAM_INFO_SECTION_OPTIONS } from '../../../utils/config.js';
import Preloader from '../../Preloader/Preloader.js';
import Section from '../../Section/Section.js';
import ProgramParticipant from '../ProgramParticipant/ProgramParticipant.js';
import AddParticipantPopup from '../ProgramPopup/AddParticipantPopup/AddParticipantPopup.js';
import EditParticipantPopup from '../ProgramPopup/EditParticipantPopup/EditParticipantPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function ProgramInfo({ currentProgram, isEditRights }) {

  const [sectionOptions, setSectionOptions] = React.useState(PROGRAM_INFO_SECTION_OPTIONS);

  const [participants, setParticipants] = React.useState([]);
  const [currentParticipant, setCurrentParticipant] = React.useState({});

  const [programInfo, setProgramInfo] = React.useState({});
  const [programRoles, setProgramRoles] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [uniqueUser, setUniqueUser] = React.useState([]);

  const [isOpenAddParticipantPopup, setIsOpenAddParticipantPopup] = React.useState(false);
  const [isOpenEditParticipantPopup, setIsOpenEditParticipantPopup] = React.useState(false);
  const [isOpenRemoveParticipantPopup, setIsOpenRemoveParticipantPopup] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function handleChooseOption(option) {
    console.log(option);
    //navigate('/program/' + currentProgram.id + '/discipline' + option.link);
  }

  function openAddParticipantPopup() {
    setIsOpenAddParticipantPopup(true);
  }

  function openEditParticipantPopup(item) {
    setCurrentParticipant(item);
    setIsOpenEditParticipantPopup(true);
  }
  
  function openRemoveParticipantPopup(item) {
    setCurrentParticipant(item);
    setIsOpenRemoveParticipantPopup(true);
  }

  function getProgramInfo() {
    const token = localStorage.getItem('token');
    setIsLoadingPage(true);
    Promise.all([
      programApi.getProgramInfo({ token, programId: currentProgram.id }),
      programApi.getProgramRoles({ token }),
      usersApi.getUsers({ token }),
    ])
    .then(([info, roles, users]) => {
      setProgramInfo(info);
      setParticipants(info.participants);
      setProgramRoles(roles);
      setUsers(users);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function closeProgramInfoPopup() {
    setIsOpenAddParticipantPopup(false);
    setIsOpenEditParticipantPopup(false);
    setIsOpenRemoveParticipantPopup(false);
  }

  function handleAddParticipant(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.addParticipant({ token, programId: currentProgram.id, participant: item })
    .then((res) => {   
      setParticipants(res);
      closeProgramInfoPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleEditParticipant(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.editParticipant({ token, programId: currentProgram.id, participant: item })
    .then((res) => {   
      setParticipants(res);
      closeProgramInfoPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleRemoveParticipant(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.removeParticipant({ token, programId: currentProgram.id, participant: item })
    .then((res) => {   
      setParticipants(res);
      closeProgramInfoPopup();
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
    let participantsId = participants.map((item) => item.id);
    setUniqueUser(users.filter((item) => participantsId.indexOf(item.id) === -1));
  // eslint-disable-next-line
  }, [participants]);

  React.useEffect(() => {
    getProgramInfo();

    return(() => {
      setParticipants([]);
      setProgramRoles([]);
      setUsers([]);
      setUniqueUser([]);
      setCurrentParticipant({});
      setProgramInfo({});
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
      title={'Характеристика программы'} 
      options={sectionOptions} 
      onChooseOption={handleChooseOption} 
      heightType={'page'} 
      headerType={'large'}
      >
        <div className='program-info'>

          <h3 className='program-info__title'>Информация о программе</h3>
          <div className='program-info-description'>
            <ul className='program-info-description__list'>
              <li className='program-info-description__item'>
                <p className='program-info-description__caption'>Направление:</p>
                <div className='program-info-description__name'>{programInfo.direction.name || ''}</div>
              </li>
              <li className='program-info-description__item'>
                <p className='program-info-description__caption'>Форма обучения:</p>
                <div className='program-info-description__name'>{programInfo.form || ''}</div>
              </li>
              <li className='program-info-description__item'>
                <p className='program-info-description__caption'>Профиль:</p>
                <div className='program-info-description__name'>{programInfo.profile || ''}</div>
              </li>
            </ul>
            <div className='program-info-description__text'>
              <p className='program-info-description__caption'>Аннотация:</p>
              <div className='program-info-description__textarea scroll'>{programInfo.annotation || ''}</div>
            </div>
          </div>

          <h3 className='program-info__title'>Участники программы</h3>
          <p className='program-info__subtitle'>Ваша роль в программе: <span className='program-info__text_type_accent'>Методист</span></p>
          <div className='section__header section__header_margin_top'>
            <button className='section__header-btn' type='button' onClick={openAddParticipantPopup}>Добавить участника</button>
          </div>
          <ProgramParticipant
            programInfo={programInfo}
            participants={participants}
            onEdit={openEditParticipantPopup}
            onRemove={openRemoveParticipantPopup}
            isEditRights={isEditRights}
          />
          
        </div>
      </Section>
    }
    {
      isOpenAddParticipantPopup &&
      <AddParticipantPopup
        isOpen={isOpenAddParticipantPopup} 
        onClose={closeProgramInfoPopup}
        users={uniqueUser}
        roles={programRoles}
        onAdd={handleAddParticipant}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenEditParticipantPopup &&
      <EditParticipantPopup
        isOpen={isOpenEditParticipantPopup} 
        onClose={closeProgramInfoPopup}
        currentParticipant={currentParticipant}
        roles={programRoles}
        onEdit={handleEditParticipant}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenRemoveParticipantPopup &&
      <ConfirmRemovePopup
        isOpen={isOpenRemoveParticipantPopup}
        onClose={closeProgramInfoPopup}
        onConfirm={handleRemoveParticipant}
        item={{...currentParticipant, id: currentParticipant.user.id}}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    </>
  )
}

export default ProgramInfo; 