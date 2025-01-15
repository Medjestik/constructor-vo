import React from 'react';
import './Product.css';
import * as productApi from '../../utils/product.js';
import * as programApi from '../../utils/program.js';
import { PRODUCT_SECTION_OPTIONS } from '../../utils/config.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import Levels from '../Levels/Levels.js';
import ProductLevel from './ProductLevel/ProductLevel.js';
import ProductStageLevel from './ProductStageLevel/ProductStageLevel.js';
import ProductProcessLevel from './ProductProcessLevel/ProductProcessLevel.js';
import ProductResultLevel from './ProductResultLevel .js';
import AddProductPopup from './ProductPopup/AddProductPopup/AddProductPopup.js';
import EditProductPopup from './ProductPopup/EditProductPopup/EditProductPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import AddStagePopup from './ProductPopup/AddStagePopup/AddStagePopup.js';
import EditStagePopup from './ProductPopup/EditStagePopup/EditStagePopup.js'
import AddProcessPopup from './ProductPopup/AddProcessPopup/AddProcessPopup.js';
import EditProcessPopup from './ProductPopup/EditProcessPopup/EditProcessPopup.js';
import ChangeOrderPopup from '../Popup/ChangeOrderPopup/ChangeOrderPopup.js';
import AddResultPopup from './ProductPopup/AddResultPopup/AddResultPopup.js';
import EditResultPopup from './ProductPopup/EditResultPopup/EditResultPopup.js';
import NsiPopup from '../Popup/NsiPopup/NsiPopup.js';
import InfoPopup from '../Popup/InfoPopup/InfoPopup.js';

function Product({ currentProgram, nsiTypes, ministries, isEditRights }) {

  const [sectionOptions, setSectionOptions] = React.useState(PRODUCT_SECTION_OPTIONS);

  const [products, setProducts] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [processes, setProcesses] = React.useState([]);
  const [results, setResults] = React.useState([]);

  const [nsi, setNsi] = React.useState([]);

  const [isOpenStages, setIsOpenStages] = React.useState(false);
  const [isOpenProcesses, setIsOpenProcesses] = React.useState(false);
  const [isOpenResults, setIsOpenResults] = React.useState(false);

  const [isShowStages, setIsShowStages] = React.useState(true);
  const [isShowProcesses, setIsShowProcesses] = React.useState(false);
  const [isShowResults, setIsShowResults] = React.useState(false);
  
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [currentStage, setCurrentStage] = React.useState({});
  const [currentProcess, setCurrentProcess] = React.useState({});
  const [currentResult, setCurrentResult] = React.useState({});

  const [openProduct, setOpenProduct] = React.useState({});
  const [openStage, setOpenStage] = React.useState({});
  const [openProcess, setOpenProcess] = React.useState({});

  const [breadcrumb, setBreadcrumb] = React.useState('');

  const [isOpenAddProductPopup, setIsOpenAddProductPopup] = React.useState(false);
  const [isOpenEditProductPopup, setIsOpenEditProductPopup] = React.useState(false);
  const [isOpenRemoveProductPopup, setIsOpenRemoveProductPopup] = React.useState(false);

  const [isOpenAddStagePopup, setIsOpenAddStagePopup] = React.useState(false);
  const [isOpenEditStagePopup, setIsOpenEditStagePopup] = React.useState(false);
  const [isOpenRemoveStagePopup, setIsOpenRemoveStagePopup] = React.useState(false);

  const [isOpenAddProcessPopup, setIsOpenAddProcessPopup] = React.useState(false);
  const [isOpenEditProcessPopup, setIsOpenEditProcessPopup] = React.useState(false);
  const [isOpenRemoveProcessPopup, setIsOpenRemoveProcessPopup] = React.useState(false);
  const [isOpenChangeOrderProcessPopup, setIsOpenChangeOrderProcessPopup] = React.useState(false);

  const [isOpenAddResultPopup, setIsOpenAddResultPopup] = React.useState(false);
  const [isOpenEditResultPopup, setIsOpenEditResultPopup] = React.useState(false);
  const [isOpenRemoveResultPopup, setIsOpenRemoveResultPopup] = React.useState(false);

  const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState({ isShow: false, title: '', text: '' });

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [isOpenNsiPopup, setIsOpenNsiPopup] = React.useState(false);

  const containerRef = React.useRef(null);

  function handleChooseOption(option) {
    console.log(option);
    //navigate('/program/' + currentProgram.id + '/discipline' + option.link);
  }

  function handleCarouselScroll(type, index) {
    if (type === 'stages') {
      setIsShowStages(true);
      setIsShowProcesses(false);
      setIsShowResults(false);
    } else if (type === 'processes') {
      setIsShowStages(false);
      setIsShowProcesses(true);
      setIsShowResults(false);
    } else {
      setIsShowStages(false);
      setIsShowProcesses(false);
      setIsShowResults(true);
    }
    
    const container = containerRef.current;
    const itemWidth = container.offsetWidth / 2;

    if (container && itemWidth) {
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
    }
  }

  function getProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingPage(true);
      Promise.all([
        productApi.getProductsData({ token: token, programId: currentProgram.id }),
        programApi.getNsi({ token: token, programId: currentProgram.id }),
      ])
        .then(([product, nsi]) => {
          setProducts(product);
          setNsi(nsi);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
  }

  function handleAddNsi(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    programApi.addNsi({ token: token, programId: currentProgram.id, nsi: item })
      .then((res) => {
        setNsi([...nsi, res]);
        closeNsiPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }
  
  function handleAddProduct(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addProduct({ token: token, programId: currentProgram.id, product: item })
      .then((res) => {
        setProducts([...products, res]);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditProduct(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.editProduct({ token: token, programId: currentProgram.id, product: item })
      .then((res) => {
        const index = products.indexOf(products.find((elem) => (elem.id === res.id)));
        setProducts([...products.slice(0, index), res, ...products.slice(index + 1)]);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveProduct(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.removeProduct({ token: token, programId: currentProgram.id, product: item })
    .then((res) => {     
      const newProducts = products.filter((elem) => elem.id !== res.id);
      if (openProduct.id === res.id) {
        setCurrentProduct({});
        setCurrentStage({});
        setStages([]);
        setCurrentProcess({});
        setProcesses([]);
        setIsShowStages(false);
        setIsShowProcesses(false);
      }
      setProducts(newProducts);
      closeProductPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleAddStage(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addStage({ token: token, productId: openProduct.id, stage: item })
      .then((res) => {
        const findProduct = products.find((elem) => (elem.id === res.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === res.product)));
        const newStages = [...findProduct.stages, res];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditStage(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.editStage({ token: token, productId: item.product, stage: item })
      .then((res) => {
        const findProduct = products.find((elem) => (elem.id === item.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === item.product)));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === res.id)));
        const newStages = [...findProduct.stages.slice(0, indexStage), res, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveStage(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.removeStage({ token: token, productId: item.product, stage: item })
      .then((res) => {
        const findProduct = products.find((elem) => (elem.id === item.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === item.product)));
        const newStages = findProduct.stages.filter((elem) => elem.id !== res.id);
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleAddProcess(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addProcess({ token: token, stageId: openStage.id, process: item })
      .then((res) => {
        const findProduct = products.find((elem) => (elem.id === res.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === res.product)));
        const findStage = findProduct.stages.find((elem) => (elem.id === res.stage));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === res.stage)));
        const newProcesses = [...findStage.processes, res];
        const newStages = [...findProduct.stages.slice(0, indexStage), {...findStage, processes: newProcesses}, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        setProcesses(newProcesses);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditProcess(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.editProcess({ token: token, stageId: item.stage, process: item })
      .then((res) => {
        const findProduct = products.find((elem) => (elem.id === res.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === res.product)));
        const findStage = findProduct.stages.find((elem) => (elem.id === res.stage));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === res.stage)));
        const indexProcess = findStage.processes.indexOf(findStage.processes.find((elem) => (elem.id === res.id)));
        const newProcesses = [...findStage.processes.slice(0, indexProcess), res, ...findStage.processes.slice(indexProcess + 1)];
        const newStages = [...findProduct.stages.slice(0, indexStage), {...findStage, processes: newProcesses}, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        setProcesses(newProcesses);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveProcess(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.removeProcess({ token: token, stageId: item.stage, process: item })
      .then((res) => {
        console.log(res);
        const findProduct = products.find((elem) => (elem.id === item.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === item.product)));
        const findStage = findProduct.stages.find((elem) => (elem.id === item.stage));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === item.stage)));
        const newProcesses = findStage.processes.filter((elem) => elem.id !== res.id);
        const newStages = [...findProduct.stages.slice(0, indexStage), {...findStage, processes: newProcesses}, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        setProcesses(newProcesses);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleChangeOrderProcess(order) {
  }

  function handleAddResult(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addResult({ token: token, processId: openProcess.id, result: item })
      .then((res) => {
        console.log(res);
        const findProduct = products.find((elem) => (elem.id === res.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === res.product)));
        const findStage = findProduct.stages.find((elem) => (elem.id === res.stage));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === res.stage)));
        const findProcess = findStage.processes.find((elem) => (elem.id === res.process));
        const indexProcess = findStage.processes.indexOf(findStage.processes.find((elem) => (elem.id === res.process)));
        const newResults = [...findProcess.results, res];
        const newProcesses = [...findStage.processes.slice(0, indexProcess), {...findProcess, results: newResults }, ...findStage.processes.slice(indexProcess + 1)];
        const newStages = [...findProduct.stages.slice(0, indexStage), {...findStage, processes: newProcesses}, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        setProcesses(newProcesses);
        setResults(newResults);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleEditResult(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.editResult({ token: token, processId: openProcess.id, result: item })
      .then((res) => {
        console.log(res);
        const findProduct = products.find((elem) => (elem.id === res.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === res.product)));
        const findStage = findProduct.stages.find((elem) => (elem.id === res.stage));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === res.stage)));
        const findProcess = findStage.processes.find((elem) => (elem.id === res.process));
        const indexProcess = findStage.processes.indexOf(findStage.processes.find((elem) => (elem.id === res.process)));
        const indexResult = findProcess.results.indexOf(findProcess.results.find((elem) => (elem.id === res.id)));
        const newResults = [...findProcess.results.slice(0, indexResult), res, ...findProcess.results.slice(indexResult + 1)];
        const newProcesses = [...findStage.processes.slice(0, indexProcess), {...findProcess, results: newResults }, ...findStage.processes.slice(indexProcess + 1)];
        const newStages = [...findProduct.stages.slice(0, indexStage), {...findStage, processes: newProcesses}, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        setProcesses(newProcesses);
        setResults(newResults);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function handleRemoveResult(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.removeResult({ token: token, processId: openProcess.id, result: item })
      .then((res) => {
        console.log(res);
        const findProduct = products.find((elem) => (elem.id === item.product));
        const indexProduct = products.indexOf(products.find((elem) => (elem.id === item.product)));
        const findStage = findProduct.stages.find((elem) => (elem.id === item.stage));
        const indexStage = findProduct.stages.indexOf(findProduct.stages.find((elem) => (elem.id === item.stage)));
        const findProcess = findStage.processes.find((elem) => (elem.id === item.process));
        const indexProcess = findStage.processes.indexOf(findStage.processes.find((elem) => (elem.id === item.process)));
        const newResults = findProcess.results.filter((elem) => elem.id !== res.id);
        const newProcesses = [...findStage.processes.slice(0, indexProcess), {...findProcess, results: newResults }, ...findStage.processes.slice(indexProcess + 1)];
        const newStages = [...findProduct.stages.slice(0, indexStage), {...findStage, processes: newProcesses}, ...findProduct.stages.slice(indexStage + 1)];
        setProducts([...products.slice(0, indexProduct), {...findProduct, stages: newStages}, ...products.slice(indexProduct + 1)]);
        setStages(newStages);
        setProcesses(newProcesses);
        setResults(newResults);
        closeProductPopup();
      })
      .catch((err) => {
        console.log(err);
        setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
  }

  function openAddProductPopup() {
    setIsOpenAddProductPopup(true);
  }

  function openEditProductPopup(item) {
    setCurrentProduct(item);
    setIsOpenEditProductPopup(true);
  }

  function openRemoveProductPopup(item) {
    setCurrentProduct(item);
    setIsOpenRemoveProductPopup(true);
  }

  function openAddStagePopup() {
    setIsOpenAddStagePopup(true);
  }

  function openEditStagePopup(item) {
    setCurrentStage(item);
    setIsOpenEditStagePopup(true);
  }

  function openRemoveStagePopup(item) {
    setCurrentStage(item);
    setIsOpenRemoveStagePopup(true);
  }

  function openAddProcessPopup() {
    setIsOpenAddProcessPopup(true);
  }

  function openEditProcessPopup(item) {
    setCurrentProcess(item);
    setIsOpenEditProcessPopup(true);
  }

  function openRemoveProcessPopup(item) {
    setCurrentProcess(item);
    setIsOpenRemoveProcessPopup(true);
  }

  function openChangeOrderProcessPopup() {
    //setIsOpenChangeOrderProcessPopup(true);
  }

  function openAddResultPopup() {
    setIsOpenAddResultPopup(true);
  }

  function openEditResultPopup(item) {
    setCurrentResult(item);
    setIsOpenEditResultPopup(true);
  }

  function openRemoveResultPopup(item) {
    setCurrentResult(item);
    setIsOpenRemoveResultPopup(true);
  }

  function openNsiPopup() {
    setIsOpenNsiPopup(true);
  }

  function closeNsiPopup() {
    setIsOpenNsiPopup(false);
  }

  function openInfoPopup(title, text) {
    setIsOpenInfoPopup({ isShow: true, title, text });
  }

  function closeInfoPopup() {
    setIsOpenInfoPopup({ isShow: false, title: '', text: '' });
  }

  function closeProductPopup() {
    setIsOpenAddProductPopup(false);
    setIsOpenEditProductPopup(false);
    setIsOpenRemoveProductPopup(false);
    setIsOpenAddStagePopup(false);
    setIsOpenEditStagePopup(false);
    setIsOpenRemoveStagePopup(false);
    setIsOpenAddProcessPopup(false);
    setIsOpenEditProcessPopup(false);
    setIsOpenRemoveProcessPopup(false);
    setIsOpenChangeOrderProcessPopup(false);
    setIsOpenAddResultPopup(false);
    setIsOpenEditResultPopup(false);
    setIsOpenRemoveResultPopup(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function handleOpenProduct(data, i) {
    setOpenProduct({...data, code: i});
    setStages(data.stages);
    setIsOpenStages(true);
    setOpenStage({});
    setOpenProcess({});
  }

  function handleOpenStage(data, i) {
    setOpenStage({...data, code: i});
    setProcesses(data.processes);
    handleCarouselScroll('processes', 1)
    setIsOpenProcesses(true);
    setOpenProcess({});
  }

  function handleOpenProcess(data, i) {
    setOpenProcess({...data, code: i});
    setResults(data.results);
    handleCarouselScroll('results', 2)
    setIsOpenResults(true);
  }

  React.useEffect(() => {
    if (openProduct.name && openStage.name && openProcess.name) {
      setBreadcrumb(openProduct.name + ' / ' + openStage.name + ' / ' + openProcess.name);
    } else if (openProduct.name && openStage.name) {
      setBreadcrumb(openProduct.name + ' / ' + openStage.name);
    } else if (openProduct.name) { 
      setBreadcrumb(openProduct.name);
    } else {
      setBreadcrumb('');
    }
  }, [openProduct, openStage, openProcess]);

  React.useEffect(() => {
    getProducts();
    return(() => {
      setProducts([]);
      setStages([]);
      setProcesses([]);
      setResults([]);
      setCurrentProduct({});
      setCurrentStage({});
      setCurrentProcess({});
      setOpenProduct({});
      setOpenStage({});
      setOpenProcess({});
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
        title={'Реконструкция деятельности'} 
        options={sectionOptions} 
        onChooseOption={handleChooseOption}
        heightType={'page'} 
        headerType={'large'}
        >
          <Levels direction={'column'}>
            <div className='levels-carousel__control'>
              <button className={`levels-carousel__button ${isShowStages ? 'levels-carousel__button_type_active' : ''}`} onClick={() => handleCarouselScroll('stages', 0)}>{currentProgram.type === 2 ? 'Области' : 'Этапы'}</button>
              <button className={`levels-carousel__button ${isShowProcesses ? 'levels-carousel__button_type_active' : ''}`} onClick={() => handleCarouselScroll('processes', 1)}>Процессы</button>
              <button className={`levels-carousel__button ${isShowResults ? 'levels-carousel__button_type_active' : ''}`} onClick={() => handleCarouselScroll('results', 2)}>Результаты</button>
            </div>
            <p className='levels__breadcrumb'>{breadcrumb}</p>
            <div className='levels-carousel__container' >
              <div className='levels-carousel' ref={containerRef}>
                <div className='levels-carousel__item'>
                  <ProductLevel 
                    data={products} 
                    currentProgramType={currentProgram.type}
                    openProduct={openProduct} 
                    onAdd={openAddProductPopup} 
                    onOpen={handleOpenProduct} 
                    onEdit={openEditProductPopup} 
                    onRemove={openRemoveProductPopup} 
                    onInfo={openInfoPopup}
                  />
                </div>
                <div className='levels-carousel__item'> 
                  <ProductStageLevel 
                    data={stages} 
                    currentProgramType={currentProgram.type}
                    isOpenStages={isOpenStages}
                    openProduct={openProduct}
                    openStage={openStage}
                    onAdd={openAddStagePopup} 
                    onOpen={handleOpenStage} 
                    onEdit={openEditStagePopup}
                    onRemove={openRemoveStagePopup}
                    onInfo={openInfoPopup}
                  />
                </div>
                <div className='levels-carousel__item'>
                  <ProductProcessLevel 
                    data={processes} 
                    isOpenProcesses={isOpenProcesses}
                    openProduct={openProduct}
                    openStage={openStage}
                    openProcess={openProcess}
                    onAdd={openAddProcessPopup} 
                    onOpen={handleOpenProcess}
                    onEdit={openEditProcessPopup}
                    onRemove={openRemoveProcessPopup}
                    onChangeOrder={openChangeOrderProcessPopup}
                    onInfo={openInfoPopup}
                  />
                </div>
                <div className='levels-carousel__item'>
                  <ProductResultLevel 
                    data={results} 
                    isOpenResults={isOpenResults}
                    onAdd={openAddResultPopup} 
                    onEdit={openEditResultPopup}
                    onRemove={openRemoveResultPopup}
                    onInfo={openInfoPopup}
                  />
                </div>
              </div>
            </div>
          </Levels>
        </Section>
      }
      {
        isOpenAddProductPopup &&
        <AddProductPopup
          isOpen={isOpenAddProductPopup} 
          onClose={closeProductPopup}
          onAdd={handleAddProduct}
          nsi={nsi}
          currentProgramType={currentProgram.type}
          onOpenNsi={openNsiPopup}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenEditProductPopup &&
        <EditProductPopup
          isOpen={isOpenEditProductPopup} 
          onClose={closeProductPopup}
          currentProduct={currentProduct}
          currentProgramType={currentProgram.type}
          onEdit={handleEditProduct}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenRemoveProductPopup &&
        <ConfirmRemovePopup
          isOpen={isOpenRemoveProductPopup}
          onClose={closeProductPopup}
          onConfirm={handleRemoveProduct}
          item={currentProduct}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenAddStagePopup &&
        <AddStagePopup
          isOpen={isOpenAddStagePopup} 
          onClose={closeProductPopup}
          onAdd={handleAddStage}
          currentProgramType={currentProgram.type}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenEditStagePopup &&
        <EditStagePopup
          isOpen={isOpenEditStagePopup} 
          onClose={closeProductPopup}
          currentStage={currentStage}
          onEdit={handleEditStage}
          currentProgramType={currentProgram.type}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenRemoveStagePopup &&
        <ConfirmRemovePopup
          isOpen={isOpenRemoveStagePopup}
          onClose={closeProductPopup}
          onConfirm={handleRemoveStage}
          item={currentStage}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenAddProcessPopup &&
        <AddProcessPopup
          isOpen={isOpenAddProcessPopup} 
          onClose={closeProductPopup}
          onAdd={handleAddProcess}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenEditProcessPopup &&
        <EditProcessPopup
          isOpen={isOpenEditProcessPopup} 
          onClose={closeProductPopup}
          currentProcess={currentProcess}
          onEdit={handleEditProcess}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenRemoveProcessPopup &&
        <ConfirmRemovePopup
          isOpen={isOpenRemoveProcessPopup}
          onClose={closeProductPopup}
          onConfirm={handleRemoveProcess}
          item={currentProcess}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
      isOpenChangeOrderProcessPopup &&
      <ChangeOrderPopup
        isOpen={isOpenChangeOrderProcessPopup}
        onClose={closeProductPopup}
        onConfirm={handleChangeOrderProcess}
        data={openStage.processes}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
      }
      {
        isOpenAddResultPopup &&
        <AddResultPopup
          isOpen={isOpenAddResultPopup} 
          onClose={closeProductPopup}
          onAdd={handleAddResult}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenEditResultPopup &&
        <EditResultPopup
          isOpen={isOpenEditResultPopup} 
          onClose={closeProductPopup}
          currentResult={currentResult}
          onEdit={handleEditResult}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenRemoveResultPopup &&
        <ConfirmRemovePopup
          isOpen={isOpenRemoveResultPopup}
          onClose={closeProductPopup}
          onConfirm={handleRemoveResult}
          item={currentResult}
          isShowRequestError={isShowRequestError}
          isLoadingRequest={isLoadingRequest}
        />
      }
      {
        isOpenNsiPopup &&
        <NsiPopup
          isOpen={isOpenNsiPopup} 
          onClose={closeNsiPopup} 
          nsiTypes={nsiTypes}
          ministries={ministries} 
          onAdd={handleAddNsi} 
          isLoading={false}
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

export default Product; 
