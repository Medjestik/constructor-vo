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

function EditNsiPopup({ isOpen, onClose, nsiTypes, ministries, currentNsi, onEdit, onRemove, isLoading }) {
  
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
    onClose();
  }

  React.useEffect(() => {
    if (!currentNsi || !currentNsi.type) return;
    switch (currentNsi.type) {
      case 9: // Федеральный закон
        setIsFederalLawPopupOpen(true);
        break;
      case 10: // Закон РФ
        setIsRussiaLawPopupOpen(true);
        break;
      case 11: // Кодекс РФ
        setIsRussiaCodexPopupOpen(true);
        break;
      case 12: // Указ Президента РФ
        setIsPresidentEdictPopupOpen(true);
        break;
      case 13: // Постановление Правительства РФ
        setIsGovernmentDecreePopupOpen(true);
        break;
      case 14: // Распоряжение Правительства РФ
        setIsGovernmentOrderPopupOpen(true);
        break;
      case 15: // Паспорт национального проекта
        setIsPassportNationalProjectPopupOpen(true);
        break;
      case 16: // Поручение Президента РФ
        setIsPresidentAssignmentPopupOpen(true);
        break;
      case 17: // Паспорт федерального проекта
        setIsPassportFederalProjectPopupOpen(true);
        break;
      case 18: // Паспорт проекта
        setIsPassportProjectPopupOpen(true);
        break;
      case 19: // Порядок
        setIsOrderPopupOpen(true);
        break;
      case 20: // Регламент
        setIsRegulationPopupOpen(true);
        break;
      case 21: // Технический регламент таможенного союза
        setIsTechnicalRegulationPopupOpen(true);
        break;
      case 22: // Постановление Госстроя России
        setIsRussiaConstructionResolutionPopupOpen(true);
        break;
      case 25: // Приказ Госстроя России
        setIsOrderRussiaGosConstructionPopupOpen(true);
        break;
      case 27: // Приказ Федеральной службы
        setIsOrderFederalServicePopupOpen(true);
        break;
      case 31: // Распоряжение Федеральной службы
        setIsDispositionFederalServicePopupOpen(true);
        break;
      case 32: // Методические рекомендации
        setIsGuidelinesPopupOpen(true);
        break;
      case 33: // Примерная программа
        setIsSampleProgramPopupOpen(true);
        break;
      case 35: // Требования
        setIsRequirementsPopupOpen(true);
        break;
      case 36: // Каталог
        setIsCatalogPopupOpen(true);
        break;
      case 37: // ГОСТ Р
        setIsStandardRPopupOpen(true);
        break;
      case 38: // ГОСТ
        setIsStandardPopupOpen(true);
        break;
      case 39: // ОДМ
        setIsODMPopupOpen(true);
        break;
      case 40: // СТО
        setIsSTOPopupOpen(true);
        break;
      case 41: // СПО
        setIsSPOPopupOpen(true);
        break;
      case 42: // ГСН (Сборник)
        setIsGSNPopupOpen(true);
        break;
      case 43: // СНиПы
        setIsSNIPPopupOpen(true);
        break;
      case 44: // СП
        setIsSPPopupOpen(true);
        break;
      case 45: // ЕНИР
        setIsENIRPopupOpen(true);
        break;
      case 46: // ТУ
        setIsTYPopupOpen(true);
        break;
      case 47: // ISO
        setIsISOPopupOpen(true);
        break;
      case 48: // Учебники, монографии
        setIsTextbookPopupPopupOpen(true);
        break;
      case 49: // ПНСТ
        setIsPNSTPopupOpen(true);
        break;
      case 50: // Официальный сайт
        setIsOfficialSitePopupOpen(true);
        break;
      case 51: // Приказ Росстата
        setIsOrderRosStatPopupOpen(true);
        break;
      case 52: // Локальный акт организации
        setIsLocalOrganizationActPopupOpen(true);
        break;
      case 53: // Статья из журнала
        setIsArticleFromMagazinePopupOpen(true);
        break;
      case 54: // Статья из сборника
        setIsArticleFromCollectionPopupOpen(true);
        break;
      case 55: // Приказ Министерства
        setIsOrderMinistryPopupOpen(true);
        break;
      case 56: // Распоряжение Министерства
        setIsDispositionMinistryPopupOpen(true);
        break;
      case 57: // Международный документ
        setIsInternationalDocumentPopupPopupOpen(true);
        break;
      case 58: // Другое
        setIsOtherPopupOpen(true);
        break;
      default:
        console.log("Неизвестный тип:");
    }
  // eslint-disable-next-line
  }, [isOpen, currentNsi]);

  return (
    <>
    {
      isFederalLawPopupOpen && 
      <FederalLawPopup
        isOpen={isFederalLawPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaLawPopupOpen &&
      <RussiaLawPopup
        isOpen={isRussiaLawPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaCodexPopupOpen &&
      <RussiaCodexPopup
        isOpen={isRussiaCodexPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isPresidentEdictPopupOpen &&
      <PresidentEdictPopup
        isOpen={isPresidentEdictPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isGovernmentDecreePopupOpen &&
      <GovernmentDecreePopup
        isOpen={isGovernmentDecreePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isGovernmentOrderPopupOpen &&
      <GovernmentOrderPopup
        isOpen={isGovernmentOrderPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isPresidentAssignmentPopupOpen &&
      <PresidentAssignmentPopup
        isOpen={isPresidentAssignmentPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isPassportNationalProjectPopupOpen &&
      <PassportNationalProjectPopup
        isOpen={isPassportNationalProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isPassportFederalProjectPopupOpen &&
      <PassportFederalProjectPopup
        isOpen={isPassportFederalProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isPassportProjectPopupOpen &&
      <PassportProjectPopup
        isOpen={isPassportProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOrderPopupOpen &&
      <OrderPopup
        isOpen={isOrderPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isRegulationPopupOpen &&
      <RegulationPopup
        isOpen={isRegulationPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isTechnicalRegulationPopupOpen &&
      <TechnicalRegulationPopup
        isOpen={isTechnicalRegulationPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaConstructionResolutionPopupOpen &&
      <RussiaConstructionResolutionPopup
        isOpen={isRussiaConstructionResolutionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRussiaGosConstructionPopupOpen &&
      <OrderRussiaGosConstructionPopup
        isOpen={isOrderRussiaGosConstructionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRosStatPopupOpen &&
      <OrderRosStatPopup
        isOpen={isOrderRosStatPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOrderFederalServicePopupOpen &&
      <OrderFederalServicePopup
        isOpen={isOrderFederalServicePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isDispositionFederalServicePopupOpen &&
      <DispositionFederalServicePopup
        isOpen={isDispositionFederalServicePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isGuidelinesPopupOpen &&
      <GuidelinesPopup
        isOpen={isGuidelinesPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isSampleProgramPopupOpen &&
      <SampleProgramPopup
        isOpen={isSampleProgramPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isRequirementsPopupOpen &&
      <RequirementsPopup
        isOpen={isRequirementsPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isCatalogPopupOpen &&
      <CatalogPopup
        isOpen={isCatalogPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isStandardRPopupOpen &&
      <StandardRPopup
        isOpen={isStandardRPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isStandardPopupOpen &&
      <StandardPopup
        isOpen={isStandardPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isODMPopupOpen &&
      <ODMPopup
        isOpen={isODMPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isSTOPopupOpen && 
      <STOPopup
        isOpen={isSTOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isSPOPopupOpen &&
      <SPOPopup
        isOpen={isSPOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isGSNPopupOpen && 
      <GSNPopup
        isOpen={isGSNPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isSNIPPopupOpen &&
      <SNIPPopup
        isOpen={isSNIPPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isSPPopupOpen &&
      <SPPopup
        isOpen={isSPPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isENIRPopupOpen &&
      <ENIRPopup
        isOpen={isENIRPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isTYPopupOpen &&
      <TYPopup
        isOpen={isTYPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isISOPopupOpen &&
      <ISOPopup
        isOpen={isISOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isPNSTPopupOpen &&
      <PNSTPopup
        isOpen={isPNSTPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOfficialSitePopupOpen &&
      <OfficialSitePopup
        isOpen={isOfficialSitePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />      
    }

    {
      isTextbookPopupPopupOpen &&
      <TextbookPopup
        isOpen={isTextbookPopupPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    } 

    {
      isLocalOrganizationActPopupOpen &&
      <LocalOrganizationAct
        isOpen={isLocalOrganizationActPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isArticleFromMagazinePopupOpen &&
      <ArticleFromMagazinePopup
        isOpen={isArticleFromMagazinePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isArticleFromCollectionPopupOpen &&
      <ArticleFromCollectionPopup
        isOpen={isArticleFromCollectionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOrderMinistryPopupOpen &&
      <OrderMinistryPopup
        isOpen={isOrderMinistryPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
        ministries={ministries}
      />
    }

    {
      isDispositionMinistryPopupOpen &&
      <DispositionMinistryPopup
        isOpen={isDispositionMinistryPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
        ministries={ministries}
      />
    }

    {
      isInternationalDocumentPopupOpen &&
      <InternationalDocumentPopup
        isOpen={isInternationalDocumentPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    {
      isOtherPopupOpen &&
      <OtherPopup
        isOpen={isOtherPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={currentNsi}
        onSave={onEdit}
        id={currentNsi.id}
        printDate={printDate}
        type={"edit"}
        isLoading={isLoading}
      />
    }

    </>
  )
}

export default EditNsiPopup;