import React from 'react';
import './Product.css';
import * as productApi from '../../utils/product.js';
import Preloader from '../Preloader/Preloader.js';
import Section from '../Section/Section.js';
import Levels from '../Levels/Levels.js';
import ProductLevel from './ProductLevel/ProductLevel.js';
import ProductStageLevel from './ProductStageLevel/ProductStageLevel.js';
import ProductProcessLevel from './ProductProcessLevel/ProductProcessLevel.js';
import AddProductPopup from './ProductPopup/AddProductPopup/AddProductPopup.js';
import EditProductPopup from './ProductPopup/EditProductPopup/EditProductPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import AddStagePopup from './ProductPopup/AddStagePopup/AddStagePopup.js';
import EditStagePopup from './ProductPopup/EditStagePopup/EditStagePopup.js'
import AddProcessPopup from './ProductPopup/AddProcessPopup/AddProcessPopup.js';
import EditProcessPopup from './ProductPopup/EditProcessPopup/EditProcessPopup.js';
import ChangeOrderPopup from '../Popup/ChangeOrderPopup/ChangeOrderPopup.js';

function Product({ currentProgram, isEditRights }) {

  const [products, setProducts] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [processes, setProcesses] = React.useState([]);

  const [isShowStages, setIsShowStages] = React.useState(false);
  const [isShowProcesses, setIsShowProcesses] = React.useState(false);
  
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [currentStage, setCurrentStage] = React.useState({});
  const [currentProcess, setCurrentProcess] = React.useState({});

  const [openProduct, setOpenProduct] = React.useState({});
  const [openStage, setOpenStage] = React.useState({});

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

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
 
  function getProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoadingPage(true);
      Promise.all([
        productApi.getProductsData({ token: token, programId: currentProgram.id }),
      ])
        .then(([product]) => {
          console.log('Products:', product);
          setProducts(product);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
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
    //setIsLoadingRequest(true);
    //const token = localStorage.getItem('token');
    /*
    productApi.changeOrderProductProcess({ token, stageId: currentProductStage.id, processes: order })
    .then((res) => {
      //setProductProcess(res.data);
      //setFilteredProductProcess(res.data);
      //closeProductProcessPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });*/
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
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function handleOpenProduct(data, i) {
    setIsShowStages(true);
    setIsShowProcesses(false);
    setOpenProduct({...data, code: i});
    setStages(data.stages);
    setOpenStage({});
  }

  function handleOpenStage(data, i) {
    setIsShowProcesses(true);
    setOpenStage({...data, code: i});
    setProcesses(data.processes);
  }

  React.useEffect(() => {
    getProducts();
    return(() => {
      setProducts([]);
      setStages([]);
      setProcesses([]);
      setCurrentProduct({});
      setCurrentStage({});
      setCurrentProcess({});
      setOpenProduct({});
      setOpenStage({});
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
        <Section title={'Реконструкция деятельности'} options={[]} heightType={'page'} headerType={'large'}>
          <Levels> 
            <ProductLevel 
              data={products} 
              openProduct={openProduct} 
              onAdd={openAddProductPopup} 
              onOpen={handleOpenProduct} 
              onEdit={openEditProductPopup} 
              onRemove={openRemoveProductPopup} 
            />
            {
              isShowStages 
              ?
              <ProductStageLevel 
                data={stages} 
                openProduct={openProduct}
                openStage={openStage}
                onAdd={openAddStagePopup} 
                onOpen={handleOpenStage} 
                onEdit={openEditStagePopup}
                onRemove={openRemoveStagePopup}
              />
              :
              <div className='level__tab'>
                <h3 className='levels__tab-title'>Этапы</h3>
              </div>
            }
            {
              isShowProcesses ?
              <ProductProcessLevel 
                data={processes} 
                openProduct={openProduct}
                openStage={openStage}
                onAdd={openAddProcessPopup} 
                onEdit={openEditProcessPopup}
                onRemove={openRemoveProcessPopup}
                onChangeOrder={openChangeOrderProcessPopup}
              />
              :
              <div className='level__tab'>
                <h3 className='levels__tab-title'>Процессы</h3>
              </div>
            }
          </Levels>
        </Section>
      }
      {
        isOpenAddProductPopup &&
        <AddProductPopup
          isOpen={isOpenAddProductPopup} 
          onClose={closeProductPopup}
          onAdd={handleAddProduct}
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
    </>
  )
}

export default Product; 



