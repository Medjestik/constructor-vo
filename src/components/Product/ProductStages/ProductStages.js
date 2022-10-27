import React from 'react';
import './ProductStages.css';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import * as productApi from '../../../utils/product.js';
import Preloader from '../../Preloader/Preloader.js';
import Breadcrumb from '../../Breadcrumb/Breadcrumb.js';
import ProductStagesTable from '../ProductStagesTable/ProductStagesTable.js';
import ProductProcess from '../ProductProcess/ProductProcess.js';
import AddProductStagePopup from '../ProductPopup/AddProductStagePopup/AddProductStagePopup.js';
import EditProductStagePopup from '../ProductPopup/EditProductStagePopup/EditProductStagePopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import ChangeOrderPopup from '../../Popup/ChangeOrderPopup/ChangeOrderPopup.js';

function ProductStages({ currentProgram, currentProduct }) {

  const navigate = useNavigate();
  const params = useParams();

  const [productStages, setProductStages] = React.useState([]);
  const [currentProductStage, setCurrentProductStage] = React.useState({});
  const [breadcrumb, setBreadcrumb] = React.useState([]);

  const [isOpenAddProductStagePopup, setIsOpenAddProductStagePopup] = React.useState(false);
  const [isOpenEditProductStagePopup, setIsOpenEditProductStagePopup] = React.useState(false);
  const [isOpenRemoveProductStagePopup, setIsOpenRemoveProductStagePopup] = React.useState(false);
  const [isOpenChangeOrderPopup, setIsOpenChangeOrderPopup] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function openAddProductStagePopup() {
    setIsOpenAddProductStagePopup(true);
  }

  function openEditProductStagePopup(item) {
    setCurrentProductStage(item);
    setIsOpenEditProductStagePopup(true);
  }
  
  function openRemoveProductStagePopup(item) {
    setCurrentProductStage(item);
    setIsOpenRemoveProductStagePopup(true);
  }

  function openChangeOrderPopup() {
    setIsOpenChangeOrderPopup(true);
  }

  function closeProductStagePopup() {
    setIsOpenAddProductStagePopup(false);
    setIsOpenEditProductStagePopup(false);
    setIsOpenRemoveProductStagePopup(false);
    setIsOpenChangeOrderPopup(false);
  }

  function getProductStages() {
    const token = localStorage.getItem('token');
    setIsLoadingPage(true);
    productApi.getProductStageList({ token, productId: currentProduct.id })
    .then((res) => {
      setProductStages(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function handleAddStage(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addProductStage({ token, productId: currentProduct.id, stage: item })
      .then((res) => {
        setProductStages([...productStages, res.data]);
        closeProductStagePopup();
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
    productApi.editProductStage({ token, productId: currentProduct.id, stage: item })
      .then((res) => {
        const index = productStages.indexOf(productStages.find((elem) => (elem.id === res.data.id)));
        setProductStages([...productStages.slice(0, index), res.data, ...productStages.slice(index + 1)]);
        closeProductStagePopup();
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
    productApi.removeProductStage({ token, productId: currentProduct.id, stage: item })
    .then((res) => {     
      const arr = productStages.filter((elem) => elem.id !== res);
      setProductStages(arr);
      closeProductStagePopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleChangeOrder(order) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.changeOrderProductStage({ token, productId: currentProduct.id, stages: order })
    .then((res) => {
      setProductStages(res.data);
      closeProductStagePopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function openStage(stage) {
    navigate('/program/' + currentProgram.id + '/product/' + currentProduct.id + '/stage/' + stage.id);
  }

  function generateBreadcrumb(item) {
    setBreadcrumb([
    { name: 'Продукты', active: true, link: '/program/' + params.programId + '/product-tab' },
    { name: item.name, active: false, link: '' },
    ]);
  }

  React.useEffect(() => {
    generateBreadcrumb(currentProduct);
    getProductStages();
    return(() => {
      setProductStages([]);
      setBreadcrumb([]);
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
      <Routes>
        <Route exact path='/' element={
          <>
          <div className='product-stages'>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className='section__header section__header_margin_top'>
              <h2 className='product-stages__title'>Этапы жизненного цикла продукта</h2>
              <button className='btn btn_type_order btn_type_order_status_active' type='button' onClick={openChangeOrderPopup}></button>
              <button className='section__header-btn' type='button' onClick={openAddProductStagePopup}>Добавить этап</button>
            </div>

            <ProductStagesTable
              stages={productStages}
              onOpen={openStage}
              onEdit={openEditProductStagePopup}
              onRemove={openRemoveProductStagePopup}
            />
          </div>
          </>
        }/>
        <Route exact path='/stage/:stageId' element={
          <ProductProcess productStages={productStages} />
        }/>
      </Routes>
    }
    {
      isOpenAddProductStagePopup &&
      <AddProductStagePopup
        isOpen={isOpenAddProductStagePopup} 
        onClose={closeProductStagePopup}
        onAdd={handleAddStage}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenEditProductStagePopup &&
      <EditProductStagePopup
        isOpen={isOpenEditProductStagePopup} 
        onClose={closeProductStagePopup}
        currentProductStage={currentProductStage}
        onEdit={handleEditStage}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenRemoveProductStagePopup &&
      <ConfirmRemovePopup
        isOpen={isOpenRemoveProductStagePopup}
        onClose={closeProductStagePopup}
        onConfirm={handleRemoveStage}
        item={currentProduct}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenChangeOrderPopup &&
      <ChangeOrderPopup
        isOpen={isOpenChangeOrderPopup}
        onClose={closeProductStagePopup}
        onConfirm={handleChangeOrder}
        data={productStages}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    </>
  )
}

export default ProductStages;
