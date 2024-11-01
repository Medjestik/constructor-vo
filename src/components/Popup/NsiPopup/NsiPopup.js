import React from 'react';
import './NsiPopup.css';
import '../../Search/Search.css';
import Popup from '../Popup.js';
import FederalLawPopup from './FederalLawPopup/FederalLawPopup.js';
import RussiaLawPopup from './RussiaLawPopup/RussiaLawPopup.js';
import RussiaCodexPopup from './RussiaCodexPopup/RussiaCodexPopup.js';
import PresidentEdictPopup from './PresidentEdictPopup/PresidentEdictPopup.js';
import GovernmentDecreePopup from './GovernmentDecreePopup/GovernmentDecreePopup.js';
import GovernmentOrderPopup from './GovernmentOrderPopup/GovernmentOrderPopup.js';
import PresidentAssignmentPopup from './PresidentAssignmentPopup/PresidentAssignmentPopup.js';
import PassportNationalProjectPopup from './PassportNationalProjectPopup/PassportNationalProjectPopup.js';
import PassportFederalProjectPopup from './PassportFederalProjectPopup/PassportFederalProjectPopup.js';
import PassportProjectPopup from './PassportProjectPopup/PassportProjectPopup.js';
import OrderPopup from './OrderPopup/OrderPopup.js';
import RegulationPopup from './RegulationPopup/RegulationPopup.js';
import TechnicalRegulationPopup from './TechnicalRegulationPopup/TechnicalRegulationPopup.js';
import RussiaConstructionResolutionPopup from './RussiaConstructionResolutionPopup/RussiaConstructionResolutionPopup.js';
import OrderRussiaGosConstructionPopup from './OrderRussiaGosConstructionPopup/OrderRussiaGosConstructionPopup.js'; 
import OrderRosStatPopup from './OrderRosStatPopup/OrderRosStatPopup.js';
import OrderFederalServicePopup from './OrderFederalServicePopup/OrderFederalServicePopup.js';
import DispositionFederalServicePopup from './DispositionFederalServicePopup/DispositionFederalServicePopup.js';
import GuidelinesPopup from './GuidelinesPopup/GuidelinesPopup.js';
import SampleProgramPopup from './SampleProgramPopup/SampleProgramPopup.js';
import RequirementsPopup from './RequirementsPopup/RequirementsPopup.js';
import CatalogPopup from './СatalogPopup/СatalogPopup.js';
import StandardRPopup from './StandardRPopup/StandardRPopup.js';
import StandardPopup from './StandardPopup/StandardPopup.js';
import ODMPopup from './ODMPopup/ODMPopup.js';
import STOPopup from './STOPopup/STOPopup.js';
import SPOPopup from './SPOPopup/SPOPopup.js';
import GSNPopup from './GSNPopup/GSNPopup.js';
import SNIPPopup from './SNIPPopup/SNIPPopup.js';
import SPPopup from './SPPopup/SPPopup.js';
import ENIRPopup from './ENIRPopup/ENIRPopup.js';
import TYPopup from './TYPopup/TYPopup.js';
import ISOPopup from './ISOPopup/ISOPopup.js';
import PNSTPopup from './PNSTPopup/PNSTPopup.js';
import OfficialSitePopup from './OfficialSitePopup/OfficialSitePopup.js';
import TextbookPopup from './TextbookPopup/TextbookPopup.js';
import LocalOrganizationAct from './LocalOrganizationAct/LocalOrganizationAct.js';
import ArticleFromMagazinePopup from './ArticleFromMagazinePopup/ArticleFromMagazinePopup.js';
import ArticleFromCollectionPopup from './ArticleFromCollectionPopup/ArticleFromCollectionPopup.js';
import OrderMinistryPopup from './OrderMinistryPopup/OrderMinistryPopup.js';
import DispositionMinistryPopup from './DispositionMinistryPopup/DispositionMinistryPopup.js';
import InternationalDocumentPopup from './InternationalDocumentPopup/InternationalDocumentPopup.js';
import OtherPopup from './OtherPopup/OtherPopup.js';

function NsiPopup({ isOpen, onClose, nsiTypes, ministries, onAdd, isLoading }) {
  
  const [isFederalLawPopupOpen, setIsFederalLawPopupOpen] = React.useState(false);
  const [isRussiaLawPopupOpen, setIsRussiaLawPopupOpen] = React.useState(false);
  const [isRussiaCodexPopupOpen, setIsRussiaCodexPopupOpen] = React.useState(false);
  const [isPresidentEdictPopupOpen, setIsPresidentEdictPopupOpen] = React.useState(false);
  const [isGovernmentDecreePopupOpen, setIsGovernmentDecreePopupOpen] = React.useState(false); 
  const [isGovernmentOrderPopupOpen, setIsGovernmentOrderPopupOpen] = React.useState(false);
  const [isPresidentAssignmentPopupOpen, setIsPresidentAssignmentPopupOpen] = React.useState(false);
  const [isPassportNationalProjectPopupOpen, setIsPassportNationalProjectPopupOpen] = React.useState(false); 
  const [isPassportFederalProjectPopupOpen, setIsPassportFederalProjectPopupOpen] = React.useState(false); 
  const [isPassportProjectPopupOpen, setIsPassportProjectPopupOpen] = React.useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = React.useState(false);
  const [isRegulationPopupOpen, setIsRegulationPopupOpen] = React.useState(false);
  const [isTechnicalRegulationPopupOpen, setIsTechnicalRegulationPopupOpen] = React.useState(false);
  const [isRussiaConstructionResolutionPopupOpen, setIsRussiaConstructionResolutionPopupOpen] = React.useState(false);
  const [isOrderRussiaGosConstructionPopupOpen, setIsOrderRussiaGosConstructionPopupOpen] = React.useState(false);
  const [isOrderRosStatPopupOpen, setIsOrderRosStatPopupOpen] = React.useState(false);
  const [isOrderFederalServicePopupOpen, setIsOrderFederalServicePopupOpen] = React.useState(false);
  const [isDispositionFederalServicePopupOpen, setIsDispositionFederalServicePopupOpen] = React.useState(false);
  const [isGuidelinesPopupOpen, setIsGuidelinesPopupOpen] = React.useState(false);
  const [isSampleProgramPopupOpen, setIsSampleProgramPopupOpen] = React.useState(false);
  const [isRequirementsPopupOpen, setIsRequirementsPopupOpen] = React.useState(false);
  const [isCatalogPopupOpen, setIsCatalogPopupOpen] = React.useState(false);
  const [isStandardRPopupOpen, setIsStandardRPopupOpen] = React.useState(false);
  const [isStandardPopupOpen, setIsStandardPopupOpen] = React.useState(false);
  const [isODMPopupOpen, setIsODMPopupOpen] = React.useState(false);
  const [isSTOPopupOpen, setIsSTOPopupOpen] = React.useState(false);
  const [isSPOPopupOpen, setIsSPOPopupOpen] = React.useState(false);
  const [isGSNPopupOpen, setIsGSNPopupOpen] = React.useState(false);
  const [isSNIPPopupOpen, setIsSNIPPopupOpen] = React.useState(false);
  const [isSPPopupOpen, setIsSPPopupOpen] = React.useState(false);
  const [isENIRPopupOpen, setIsENIRPopupOpen] = React.useState(false);
  const [isTYPopupOpen, setIsTYPopupOpen] = React.useState(false);
  const [isISOPopupOpen, setIsISOPopupOpen] = React.useState(false);
  const [isPNSTPopupOpen, setIsPNSTPopupOpen] = React.useState(false);
  const [isOfficialSitePopupOpen, setIsOfficialSitePopupOpen] = React.useState(false);
  const [isTextbookPopupPopupOpen, setIsTextbookPopupPopupOpen] = React.useState(false);
  const [isLocalOrganizationActPopupOpen, setIsLocalOrganizationActPopupOpen] = React.useState(false);
  const [isArticleFromMagazinePopupOpen, setIsArticleFromMagazinePopupOpen] = React.useState(false);
  const [isArticleFromCollectionPopupOpen, setIsArticleFromCollectionPopupOpen] = React.useState(false);
  const [isOrderMinistryPopupOpen, setIsOrderMinistryPopupOpen] = React.useState(false);
  const [isDispositionMinistryPopupOpen, setIsDispositionMinistryPopupOpen] = React.useState(false);
  const [isInternationalDocumentPopupOpen, setIsInternationalDocumentPopupPopupOpen] = React.useState(false);
  const [isOtherPopupOpen, setIsOtherPopupOpen] = React.useState(false);
  const [currentElemId, setCurrentElemId] = React.useState(0);
  const [searchText, setSearchText] = React.useState('');
  const [filteredNsiTypes, setFilteredNsiTypes] = React.useState([]);

  const emptyNsi = {
    nsiDate: "",
    nsiNumber: "",
    nsiEdit: "",
    nsiName: "",
    nsiApproveName: "",
    nsiProtocolDate: "",
    nsiProtocolNumber: "",
    nsiCode: "",
    nsiPeriod: "",
    nsiBasis: "",
    nsiAuthors: "",
    nsiEditor: "",
    nsiCity: "",
    nsiYear: "",
    nsiPages: "",
    nsiLink: "",
    nsiFullName: "",
    nsiMinistry: "",
  }

  function printDate(obj) {
    let t=new Date(obj);
    let y=t.getFullYear();
    let d=t.getDate();
    let mon=t.getMonth();
    let s = "";
    switch (mon)
    {
      case 0: s="января"; break;
      case 1: s="февраля"; break;
      case 2: s="марта"; break;
      case 3: s="апреля"; break;
      case 4: s="мая"; break;
      case 5: s="июня"; break;
      case 6: s="июля"; break;
      case 7: s="августа"; break;
      case 8: s="сентября"; break;
      case 9: s="октября"; break;
      case 10: s="ноября"; break;
      case 11: s="декабря"; break;
      default: s=""
    }
    return d+" "+s+" "+y;
  }
  
  function searchByType(e) {
    setSearchText(e.target.value);
  }

  React.useEffect(() => {
    const currentNsi = nsiTypes.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLocaleLowerCase());
    })
    setFilteredNsiTypes(currentNsi);
  }, [searchText]);

  React.useEffect(() => {
    setFilteredNsiTypes(nsiTypes);
    setSearchText('');
    return () => {
      setFilteredNsiTypes([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);

  function federalLawPopupOpen(id) {
    setIsFederalLawPopupOpen(true);
    setCurrentElemId(id);
  }

  function russiaLawPopupOpen(id) {
    setIsRussiaLawPopupOpen(true);
    setCurrentElemId(id);
  }

  function russiaCodexPopupOpen(id) {
    setIsRussiaCodexPopupOpen(true);
    setCurrentElemId(id);
  }

  function presidentEdictPopupOpen(id) {
    setIsPresidentEdictPopupOpen(true);
    setCurrentElemId(id);
  }

  function governmentDecreePopupOpen(id) {
    setIsGovernmentDecreePopupOpen(true);
    setCurrentElemId(id);
  }

  function governmentOrderPopupOpen(id) {
    setIsGovernmentOrderPopupOpen(true);
    setCurrentElemId(id);
  }

  function presidentAssignmentPopupOpen(id) {
    setIsPresidentAssignmentPopupOpen(true);
    setCurrentElemId(id);
  }

  function passportNationalProjectPopupOpen(id) {
    setIsPassportNationalProjectPopupOpen(true);
    setCurrentElemId(id);
  }

  function passportFederalProjectPopupOpen(id) {
    setIsPassportFederalProjectPopupOpen(true);
    setCurrentElemId(id);
  }

  function passportProjectPopupOpen(id) {
    setIsPassportProjectPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderPopupOpen(id) {
    setIsOrderPopupOpen(true);
    setCurrentElemId(id);
  }

  function regulationPopupOpen(id) {
    setIsRegulationPopupOpen(true);
    setCurrentElemId(id);
  }

  function technicalRegulationPopupOpen(id) {
    setIsTechnicalRegulationPopupOpen(true);
    setCurrentElemId(id);
  }

  function russiaConstructionResolutionPopupOpen(id) {
    setIsRussiaConstructionResolutionPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderRussiaGosConstructionPopupOpen(id) {
    setIsOrderRussiaGosConstructionPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderRosStatPopupOpen(id) {
    setIsOrderRosStatPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderFederalServicePopupOpen(id) {
    setIsOrderFederalServicePopupOpen(true);
    setCurrentElemId(id);
  }

  function dispositionFederalServicePopupOpen(id) {
    setIsDispositionFederalServicePopupOpen(true);
    setCurrentElemId(id);
  }

  function guidelinesPopupOpen(id) {
    setIsGuidelinesPopupOpen(true);
    setCurrentElemId(id);
  }

  function sampleProgramPopupOpen(id) {
    setIsSampleProgramPopupOpen(true);
    setCurrentElemId(id);
  }

  function requirementsPopupOpen(id) {
    setIsRequirementsPopupOpen(true);
    setCurrentElemId(id);
  }

  function catalogPopupOpen(id) {
    setIsCatalogPopupOpen(true);
    setCurrentElemId(id);
  }

  function standardRPopupOpen(id) {
    setIsStandardRPopupOpen(true);
    setCurrentElemId(id);
  }

  function standardPopupOpen(id) {
    setIsStandardPopupOpen(true);
    setCurrentElemId(id);
  }

  function odmPopupOpen(id) {
    setIsODMPopupOpen(true);
    setCurrentElemId(id);
  }

  function stoPopupOpen(id) {
    setIsSTOPopupOpen(true);
    setCurrentElemId(id);
  }

  function spoPopupOpen(id) {
    setIsSPOPopupOpen(true);
    setCurrentElemId(id);
  }

  function gsnPopupOpen(id) {
    setIsGSNPopupOpen(true);
    setCurrentElemId(id);
  }

  function snipPopupOpen(id) {
    setIsSNIPPopupOpen(true);
    setCurrentElemId(id);
  }

  function spPopupOpen(id) {
    setIsSPPopupOpen(true);
    setCurrentElemId(id);
  }

  function enirPopupOpen(id) {
    setIsENIRPopupOpen(true);
    setCurrentElemId(id);
  }

  function tyPopupOpen(id) {
    setIsTYPopupOpen(true);
    setCurrentElemId(id);
  }

  function isoPopupOpen(id) {
    setIsISOPopupOpen(true);
    setCurrentElemId(id);
  }

  function pnstPopupOpen(id) {
    setIsPNSTPopupOpen(true);
    setCurrentElemId(id);
  }

  function officialSitePopupOpen(id) {
    setIsOfficialSitePopupOpen(true);
    setCurrentElemId(id);
  }

  function textbookPopupOpen(id) {
    setIsTextbookPopupPopupOpen(true);
    setCurrentElemId(id);
  }

  function localOrganizationActPopupOpen(id) {
    setIsLocalOrganizationActPopupOpen(true);
    setCurrentElemId(id);
  }

  function articleFromMagazinePopupOpen(id) {
    setIsArticleFromMagazinePopupOpen(true);
    setCurrentElemId(id);
  }

  function articleFromCollectionPopupOpen(id) {
    setIsArticleFromCollectionPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderMinistryPopupOpen(id) {
    setIsOrderMinistryPopupOpen(true);
    setCurrentElemId(id);
  }

  function dispositionMinistryPopupOpen(id) {
    setIsDispositionMinistryPopupOpen(true);
    setCurrentElemId(id);
  }

  function internationalDocumentPopupPopupOpen(id) {
    setIsInternationalDocumentPopupPopupOpen(true);
    setCurrentElemId(id);
  }

  function otherPopupOpen(id) {
    setIsOtherPopupOpen(true);
    setCurrentElemId(id);
  }

  function closeAllNsiPopup() {
    setIsFederalLawPopupOpen(false);
    setIsRussiaLawPopupOpen(false);
    setIsRussiaCodexPopupOpen(false);
    setIsPresidentEdictPopupOpen(false);
    setIsGovernmentDecreePopupOpen(false);
    setIsGovernmentOrderPopupOpen(false)
    setIsPresidentAssignmentPopupOpen(false);
    setIsPassportNationalProjectPopupOpen(false);
    setIsPassportFederalProjectPopupOpen(false);
    setIsPassportProjectPopupOpen(false);
    setIsOrderPopupOpen(false);
    setIsRegulationPopupOpen(false);
    setIsTechnicalRegulationPopupOpen(false);
    setIsRussiaConstructionResolutionPopupOpen(false);
    setIsOrderRussiaGosConstructionPopupOpen(false);
    setIsOrderRosStatPopupOpen(false);
    setIsOrderFederalServicePopupOpen(false);
    setIsDispositionFederalServicePopupOpen(false);
    setIsGuidelinesPopupOpen(false);
    setIsSampleProgramPopupOpen(false);
    setIsRequirementsPopupOpen(false);
    setIsCatalogPopupOpen(false);
    setIsStandardRPopupOpen(false);
    setIsStandardPopupOpen(false);
    setIsODMPopupOpen(false);
    setIsSTOPopupOpen(false);
    setIsSPOPopupOpen(false);
    setIsGSNPopupOpen(false);
    setIsSNIPPopupOpen(false);
    setIsSPPopupOpen(false);
    setIsENIRPopupOpen(false);
    setIsTYPopupOpen(false);
    setIsISOPopupOpen(false);
    setIsPNSTPopupOpen(false);
    setIsOfficialSitePopupOpen(false);
    setIsTextbookPopupPopupOpen(false);
    setIsLocalOrganizationActPopupOpen(false);
    setIsArticleFromMagazinePopupOpen(false);
    setIsArticleFromCollectionPopupOpen(false);
    setIsOrderMinistryPopupOpen(false);
    setIsDispositionMinistryPopupOpen(false);
    setIsInternationalDocumentPopupPopupOpen(false);
    setIsOtherPopupOpen(false);
  }

  function defineNsiPopup(type) {  
    switch (type.id) {
      case 9: /* Федеральный закон */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => federalLawPopupOpen(type.id)}>Выбрать</button>
        )
      case 10: /* Закон РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaLawPopupOpen(type.id)}>Выбрать</button>
        )
      case 11: /* Кодекс РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaCodexPopupOpen(type.id)}>Выбрать</button>
        )
      case 12: /* Указ Президента РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => presidentEdictPopupOpen(type.id)}>Выбрать</button>
        )
      case 13: /* Постановление Правительства РФ */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => governmentDecreePopupOpen(type.id)}>Выбрать</button>
        )
      case 14: /* Распоряжение Правительства РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => governmentOrderPopupOpen(type.id)}>Выбрать</button>
        )
      case 15: /* Паспорт национального проекта */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportNationalProjectPopupOpen(type.id)}>Выбрать</button>
        )
      case 16: /* Поручение Президента РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => presidentAssignmentPopupOpen(type.id)}>Выбрать</button>
        )
      case 17: /* Паспорт федерального проекта */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportFederalProjectPopupOpen(type.id)}>Выбрать</button>
        )
      case 18: /* Паспорт проекта */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportProjectPopupOpen(type.id)}>Выбрать</button>
        )
      case 19: /* Порядок */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderPopupOpen(type.id)}>Выбрать</button>
        )
      case 20: /* Регламент */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => regulationPopupOpen(type.id)}>Выбрать</button>
        )
      case 21: /* Технический регламент таможенного союза */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => technicalRegulationPopupOpen(type.id)}>Выбрать</button>
        )
      case 22: /* Постановление Госстроя России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaConstructionResolutionPopupOpen(type.id)}>Выбрать</button>
        )
      case 25: /* Приказ Госстроя России */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaGosConstructionPopupOpen(type.id)}>Выбрать</button>
        )
      case 27: /* Приказ Федеральной службы */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderFederalServicePopupOpen(type.id)}>Выбрать</button>
        )
      case 31: /* Распоряжение Федеральной службы */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionFederalServicePopupOpen(type.id)}>Выбрать</button>
        )
      case 32: /* Методические рекомендации */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => guidelinesPopupOpen(type.id)}>Выбрать</button>
        )
      case 33: /* Примерная программа */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => sampleProgramPopupOpen(type.id)}>Выбрать</button>
        )
      case 35: /* Требования */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => requirementsPopupOpen(type.id)}>Выбрать</button>
        )
      case 36: /* Каталог */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => catalogPopupOpen(type.id)}>Выбрать</button>
        )
      case 37: /* ГОСТ Р */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => standardRPopupOpen(type.id)}>Выбрать</button>
        )
      case 38: /* ГОСТ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => standardPopupOpen(type.id)}>Выбрать</button>
        )
      case 39: /* ОДМ */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => odmPopupOpen(type.id)}>Выбрать</button>
        )
      case 40: /* СТО */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => stoPopupOpen(type.id)}>Выбрать</button>
        )
      case 41: /* СПО */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => spoPopupOpen(type.id)}>Выбрать</button>
        )
      case 42: /* ГСН (Сборник) */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => gsnPopupOpen(type.id)}>Выбрать</button>
        )
      case 43: /* СНиПы */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => snipPopupOpen(type.id)}>Выбрать</button>
        )
      case 44: /* СП */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => spPopupOpen(type.id)}>Выбрать</button>
        )
      case 45: /* ЕНИР */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => enirPopupOpen(type.id)}>Выбрать</button>
        )
      case 46: /* ТУ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => tyPopupOpen(type.id)}>Выбрать</button>
        )
      case 47: /* ISO */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => isoPopupOpen(type.id)}>Выбрать</button>
        )
      case 48: /* Учебники, монографии */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => textbookPopupOpen(type.id)}>Выбрать</button>
        )
      case 49: /* ПНСТ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => pnstPopupOpen(type.id)}>Выбрать</button>
        )      
      case 50: /* Официальный сайт */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => officialSitePopupOpen(type.id)}>Выбрать</button>
        )
      case 51: /* Приказ Росстата */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRosStatPopupOpen(type.id)}>Выбрать</button>
        )
      case 52: /* Локальный акт организации */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => localOrganizationActPopupOpen(type.id)}>Выбрать</button>
        )
      case 53: /* Статья из журнала */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => articleFromMagazinePopupOpen(type.id)}>Выбрать</button>
        )
      case 54: /* Статья из сборника */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => articleFromCollectionPopupOpen(type.id)}>Выбрать</button>
        )
      case 55: /* Приказ Министерства */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderMinistryPopupOpen(type.id)}>Выбрать</button>
        )
      case 56: /* Распоряжение Министерства */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionMinistryPopupOpen(type.id)}>Выбрать</button>
        )
      case 57: /* Международный документ */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => internationalDocumentPopupPopupOpen(type.id)}>Выбрать</button>
        )
      case 58: /* Другое */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => otherPopupOpen(type.id)}>Выбрать</button>
        )
      default:
        return (<div>Тип не загрузился</div>) 
    }
  }

  React.useEffect(() => {
    setCurrentElemId(0);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
      formWidth={'large'}
      formName={`choose-nsi-type-popup`}
      onSubmit={onAdd}
    >
      <h3 className="initial-popup__title">Выберите тип источника</h3>
      <div className="search search_type_large">
        <input
        className="search__input"
        placeholder="поиск по названию типа"
        type="text"
        id="search-input-nsi-type"
        name="search-input-nsi-name"
        autoComplete="off"
        value={searchText}
        onChange={searchByType}
        >
        </input>
      </div>
      <ul className="nsi-popup__list scroll">
        {
          filteredNsiTypes.map((type, i) => (
            <li className="nsi-popup__item" key={i}>
              {/* <DefineNsiImg nsiId={type.id} /> */}
              <div className="nsi-popup__item-info">
                <h4 className="nsi-popup__item-name">{type.name || "Название"}</h4>
                <p className="nsi-popup__item-description">{type.description || ""}</p>
              </div>
              {defineNsiPopup(type)}
            </li>
          ))
        }
      </ul>
      <div className='popup__btn_margin_top'></div>
      <button className='popup__btn-back' type='button' onClick={onClose}>Назад</button>
    </Popup>

    {
      isFederalLawPopupOpen && 
      <FederalLawPopup
        isOpen={isFederalLawPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaLawPopupOpen &&
      <RussiaLawPopup
        isOpen={isRussiaLawPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaCodexPopupOpen &&
      <RussiaCodexPopup
        isOpen={isRussiaCodexPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPresidentEdictPopupOpen &&
      <PresidentEdictPopup
        isOpen={isPresidentEdictPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGovernmentDecreePopupOpen &&
      <GovernmentDecreePopup
        isOpen={isGovernmentDecreePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGovernmentOrderPopupOpen &&
      <GovernmentOrderPopup
        isOpen={isGovernmentOrderPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPresidentAssignmentPopupOpen &&
      <PresidentAssignmentPopup
        isOpen={isPresidentAssignmentPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPassportNationalProjectPopupOpen &&
      <PassportNationalProjectPopup
        isOpen={isPassportNationalProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPassportFederalProjectPopupOpen &&
      <PassportFederalProjectPopup
        isOpen={isPassportFederalProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPassportProjectPopupOpen &&
      <PassportProjectPopup
        isOpen={isPassportProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderPopupOpen &&
      <OrderPopup
        isOpen={isOrderPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRegulationPopupOpen &&
      <RegulationPopup
        isOpen={isRegulationPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isTechnicalRegulationPopupOpen &&
      <TechnicalRegulationPopup
        isOpen={isTechnicalRegulationPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaConstructionResolutionPopupOpen &&
      <RussiaConstructionResolutionPopup
        isOpen={isRussiaConstructionResolutionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRussiaGosConstructionPopupOpen &&
      <OrderRussiaGosConstructionPopup
        isOpen={isOrderRussiaGosConstructionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRosStatPopupOpen &&
      <OrderRosStatPopup
        isOpen={isOrderRosStatPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderFederalServicePopupOpen &&
      <OrderFederalServicePopup
        isOpen={isOrderFederalServicePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isDispositionFederalServicePopupOpen &&
      <DispositionFederalServicePopup
        isOpen={isDispositionFederalServicePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGuidelinesPopupOpen &&
      <GuidelinesPopup
        isOpen={isGuidelinesPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSampleProgramPopupOpen &&
      <SampleProgramPopup
        isOpen={isSampleProgramPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRequirementsPopupOpen &&
      <RequirementsPopup
        isOpen={isRequirementsPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isCatalogPopupOpen &&
      <CatalogPopup
        isOpen={isCatalogPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isStandardRPopupOpen &&
      <StandardRPopup
        isOpen={isStandardRPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isStandardPopupOpen &&
      <StandardPopup
        isOpen={isStandardPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isODMPopupOpen &&
      <ODMPopup
        isOpen={isODMPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSTOPopupOpen && 
      <STOPopup
        isOpen={isSTOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSPOPopupOpen &&
      <SPOPopup
        isOpen={isSPOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGSNPopupOpen && 
      <GSNPopup
        isOpen={isGSNPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSNIPPopupOpen &&
      <SNIPPopup
        isOpen={isSNIPPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSPPopupOpen &&
      <SPPopup
        isOpen={isSPPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isENIRPopupOpen &&
      <ENIRPopup
        isOpen={isENIRPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isTYPopupOpen &&
      <TYPopup
        isOpen={isTYPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isISOPopupOpen &&
      <ISOPopup
        isOpen={isISOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPNSTPopupOpen &&
      <PNSTPopup
        isOpen={isPNSTPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOfficialSitePopupOpen &&
      <OfficialSitePopup
        isOpen={isOfficialSitePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />      
    }

    {
      isTextbookPopupPopupOpen &&
      <TextbookPopup
        isOpen={isTextbookPopupPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    } 

    {
      isLocalOrganizationActPopupOpen &&
      <LocalOrganizationAct
        isOpen={isLocalOrganizationActPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isArticleFromMagazinePopupOpen &&
      <ArticleFromMagazinePopup
        isOpen={isArticleFromMagazinePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isArticleFromCollectionPopupOpen &&
      <ArticleFromCollectionPopup
        isOpen={isArticleFromCollectionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderMinistryPopupOpen &&
      <OrderMinistryPopup
        isOpen={isOrderMinistryPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
        ministries={ministries}
      />
    }

    {
      isDispositionMinistryPopupOpen &&
      <DispositionMinistryPopup
        isOpen={isDispositionMinistryPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
        ministries={ministries}
      />
    }

    {
      isInternationalDocumentPopupOpen &&
      <InternationalDocumentPopup
        isOpen={isInternationalDocumentPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOtherPopupOpen &&
      <OtherPopup
        isOpen={isOtherPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    </>
  )
}

export default NsiPopup;