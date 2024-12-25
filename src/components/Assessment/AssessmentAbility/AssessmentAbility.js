import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as assessmentApi from '../../../utils/assessmentApi.js';
import Preloader from '../../Preloader/Preloader.js';
import AssessmentAbilityList from './AssessmentAbilityList/AssessmentAbilityList.js';
import AssessmentAbilityData from './AssessmentAbilityData/AssessmentAbilityData.js';

function AssessmentAbility({ currentProgram }) {

  const navigate = useNavigate();

  const [ability, setAbility] = React.useState([]);

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  function handleOpenAbility(ability) {
    navigate('/program/' + currentProgram.id +'/assessment/ability/' + ability.id);
  }

  function getData() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingData(true);
      assessmentApi.getAbilities({ token: token, programId: currentProgram.id })
      .then((res) => {
        console.log(res, 'Ability');
        setAbility(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
    }
  }

  const handleChangeAbilityQuestions = (id, count) => {
    const index = ability.indexOf(ability.find((elem) => (elem.id === id)));
    setAbility([...ability.slice(0, index), { ...ability[index], tasks_count: count }, ...ability.slice(index + 1)]);
  }

  React.useEffect(() => {
    getData();

    return(() => {
      setAbility([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingData 
      ?
      <Preloader />
      :
      <Routes>

        <Route exact path='list' element={
          <AssessmentAbilityList ability={ability} onOpen={handleOpenAbility} />
        }
        />

        <Route exact path=':abilityId' element={
          <AssessmentAbilityData ability={ability} currentProgram={currentProgram} onChangeQuestionCount={handleChangeAbilityQuestions} />
        }
        />

      </Routes>
    }
    </>
  )
}

export default AssessmentAbility;  
