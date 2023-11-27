import React from 'react';
import './ProgramItem.css';
import * as programApi from '../../../utils/program.js';
import { Route, Routes, useParams, useLocation } from 'react-router-dom';
import { PROGRAM_TABS } from '../../../utils/config.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Preloader from '../../Preloader/Preloader.js';
import SectionTabs from '../../Section/SectionTabs/SectionTabs.js';
import ProgramInfo from '../ProgramInfo/ProgramInfo.js';
import Product from '../../Product/Product.js';
import Competence from '../../Competence/Competence.js';
import Discipline from '../../Discipline/Discipline.js';
import ProductItem from '../../Product/ProductItem/ProductItem.js';

function ProgramItem() {

  const params = useParams();
  const path = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

  const [currentProgram, setCurrentProgram] = React.useState({});
  const [isEditRights, setIsEditRights] = React.useState(false);

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function getProgram() {
    const token = localStorage.getItem('token');
    setIsLoadingPage(true);
    programApi.getProgramItem({ token, id: params.programId })
    .then((res) => {
      setCurrentProgram(res);
      console.log(res);
      setIsEditRights(currentUser.id === res.authorId ? true : false);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  React.useEffect(() => {
    getProgram();
    return(() => {
      setCurrentProgram({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isLoadingPage ?
        <Preloader />
        :
        <>
        {
          path.pathname.includes('tab') &&
          <SectionTabs type='small' path={'/program/' + params.programId} tabs={PROGRAM_TABS} >
            <Routes>

              <Route exact path='info-tab' element={
                  <ProgramInfo currentProgram={currentProgram} isEditRights={isEditRights} />
                }
              />

              <Route exact path='product-tab' element={
                  <Product currentProgram={currentProgram} isEditRights={isEditRights} />
                }
              />

              <Route exact path='competence-tab/*' element={
                  <Competence currentProgram={currentProgram} isEditRights={isEditRights} />
                }
              />

              <Route exact path='discipline-tab/*' element={
                  <Discipline currentProgram={currentProgram} isEditRights={isEditRights} />
                }
              />

            </Routes>
          </SectionTabs>
        }

        <Routes>
          <Route exact path='product/:productId/*' element={ 
              <ProductItem currentProgram={currentProgram} isEditRights={isEditRights} />
            }
          />
        </Routes>

        </>
      } 
    </>
  )
}

export default ProgramItem;
