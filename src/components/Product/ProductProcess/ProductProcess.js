import React from 'react';
import './ProductProcess.css';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import * as productApi from '../../../utils/product.js';
import Preloader from '../../Preloader/Preloader.js';
import Breadcrumb from '../../Breadcrumb/Breadcrumb.js';
import Search from '../../Search/Search.js';
import ProductProcessTable from '../ProductProcessTable/ProductProcessTable.js';
import AddProductProcessPopup from '../ProductPopup/AddProductProcessPopup/AddProductProcessPopup.js';
import EditProductProcessPopup from '../ProductPopup/EditProductProcessPopup/EditProductProcessPopup.js';
import ConfirmRemovePopup from '../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import ChangeOrderPopup from '../../Popup/ChangeOrderPopup/ChangeOrderPopup.js';

function ProductProcess({ productStages }) {

  const params = useParams();

  const [breadcrumb, setBreadcrumb] = React.useState([]);
  const [currentProductStage, setCurrentProductStage] = React.useState({});
  const [productProcess, setProductProcess] = React.useState([]);
  const [filteredProductProcess, setFilteredProductProcess] = React.useState(productProcess);
  const [currentProductProcess, setCurrentProductProcess] = React.useState({});

  const [isOpenAddProductProcessPopup, setIsOpenAddProductProcessPopup] = React.useState(false);
  const [isOpenEditProductProcessPopup, setIsOpenEditProductProcessPopup] = React.useState(false);
  const [isOpenRemoveProductProcessPopup, setIsOpenRemoveProductProcessPopup] = React.useState(false);
  const [isOpenChangeOrderPopup, setIsOpenChangeOrderPopup] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function openAddProductProcessPopup() {
    setIsOpenAddProductProcessPopup(true);
  }

  function openEditProductProcessPopup(item) {
    setCurrentProductProcess(item);
    setIsOpenEditProductProcessPopup(true);
  }
  
  function openRemoveProductProcessPopup(item) {
    setCurrentProductProcess(item);
    setIsOpenRemoveProductProcessPopup(true);
  }

  function openChangeOrderPopup() {
    setIsOpenChangeOrderPopup(true);
  }

  function closeProductProcessPopup() {
    setIsOpenAddProductProcessPopup(false);
    setIsOpenEditProductProcessPopup(false);
    setIsOpenRemoveProductProcessPopup(false);
    setIsOpenChangeOrderPopup(false);
  }

  function getProductProcess() {
    const token = localStorage.getItem('token');
    setIsLoadingPage(true);
    productApi.getProductProcessList({ token, stageId: params.stageId })
    .then((res) => {
      setProductProcess(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  function handleAddProcess(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addProductProcess({ token, stageId: currentProductStage.id, process: item })
      .then((res) => {
        setProductProcess([...productProcess, res.data]);
        setFilteredProductProcess([...productProcess, res.data]);
        closeProductProcessPopup();
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
    productApi.editProductProcess({ token, stageId: currentProductStage.id, process: item })
      .then((res) => {
        const index = productProcess.indexOf(productProcess.find((elem) => (elem.id === res.data.id)));
        setProductProcess([...productProcess.slice(0, index), res.data, ...productProcess.slice(index + 1)]);
        setFilteredProductProcess([...productProcess.slice(0, index), res.data, ...productProcess.slice(index + 1)]);
        closeProductProcessPopup();
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
    productApi.removeProductProcess({ token, stageId: currentProductStage.id, process: item })
    .then((res) => {     
      const arr = productProcess.filter((elem) => elem.id !== res);
      setProductProcess(arr);
      setFilteredProductProcess(arr);
      closeProductProcessPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleSearch(data) {
    setFilteredProductProcess(data);
  }

  function handleChangeOrder(order) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.changeOrderProductProcess({ token, stageId: currentProductStage.id, processes: order })
    .then((res) => {
      setProductProcess(res.data);
      setFilteredProductProcess(res.data);
      closeProductProcessPopup();
    })
    .catch((err) => {
      console.log(err);
      setIsShowRequestError({ isShow: true, text: 'К сожалению произошла ошибка!' });
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function generateBreadcrumb(item) {
    setBreadcrumb([
    { name: 'Продукты', active: true, link: '/program/' + params.id + '/product-tab' },
    { name: 'Этапы ЖЦ', active: true, link: '/program/13/product/2' },
    { name: item.name, active: false, link: '' },
    ]);
  }

  React.useEffect(() => {
    const item = productStages.find((elem) => (elem.id === Number(params.stageId)));
    setCurrentProductStage(item);
    generateBreadcrumb(item);
    getProductProcess();

    return(() => {
      setProductProcess([]);
      setCurrentProductStage({});
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
      <div className='product-process'>
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className='section__header section__header_margin_top'>
          <Search type='medium' id='program' data={productProcess} onSearch={handleSearch} />
          <button className='btn btn_type_order btn_type_order_status_active' type='button' onClick={openChangeOrderPopup}></button>
          <button className='section__header-btn' type='button' onClick={openAddProductProcessPopup}>Добавить процесс</button>
        </div>

        <ProductProcessTable
          process={filteredProductProcess}
          onOpen={() => {}}
          onEdit={openEditProductProcessPopup}
          onRemove={openRemoveProductProcessPopup}
        />
      </div>
    }
    {
      isOpenAddProductProcessPopup &&
      <AddProductProcessPopup
        isOpen={isOpenAddProductProcessPopup} 
        onClose={closeProductProcessPopup}
        onAdd={handleAddProcess}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenEditProductProcessPopup &&
      <EditProductProcessPopup
        isOpen={isOpenEditProductProcessPopup} 
        onClose={closeProductProcessPopup}
        currentProductProcess={currentProductProcess}
        onEdit={handleEditProcess}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenRemoveProductProcessPopup &&
      <ConfirmRemovePopup
        isOpen={isOpenRemoveProductProcessPopup}
        onClose={closeProductProcessPopup}
        onConfirm={handleRemoveProcess}
        item={currentProductProcess}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isOpenChangeOrderPopup &&
      <ChangeOrderPopup
        isOpen={isOpenChangeOrderPopup}
        onClose={closeProductProcessPopup}
        onConfirm={handleChangeOrder}
        data={productProcess}
        isShowRequestError={isShowRequestError}
        isLoadingRequest={isLoadingRequest}
      />
    }
    </>
  )
}

export default ProductProcess;
