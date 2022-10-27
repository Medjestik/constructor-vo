import React from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import * as productApi from '../../utils/product.js';
import Preloader from '../Preloader/Preloader.js';
import Search from '../Search/Search.js';
import ProductTable from './ProductTable/ProductTable.js';
import AddProductPopup from './ProductPopup/AddProductPopup/AddProductPopup.js';
import EditProductPopup from './ProductPopup/EditProductPopup/EditProductPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';

function Product({ currentProgram, isEditRights }) {

  const navigate = useNavigate();

  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const [currentProduct, setCurrentProduct] = React.useState({});

  const [isOpenAddProductPopup, setIsOpenAddProductPopup] = React.useState(false);
  const [isOpenEditProductPopup, setIsOpenEditProductPopup] = React.useState(false);
  const [isOpenRemoveProductPopup, setIsOpenRemoveProductPopup] = React.useState(false);

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
 
  function getProducts() {
    const token = localStorage.getItem('token');
    Promise.all([
      productApi.getProductList({ token, programId: currentProgram.id }),
    ])
      .then(([product]) => {
        console.log('Products:', product.data);
        setProducts(product.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }
  
  function handleAddProduct(item) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem('token');
    productApi.addProduct({ token, programId: currentProgram.id, product: item })
      .then((res) => {
        setProducts([...products, res.data]);
        setFilteredProducts([...products, res.data]);
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
    productApi.editProduct({ token, programId: currentProgram.id, product: item })
      .then((res) => {
        const index = products.indexOf(products.find((elem) => (elem.id === res.data.id)));
        setProducts([...products.slice(0, index), res.data, ...products.slice(index + 1)]);
        setFilteredProducts([...products.slice(0, index), res.data, ...products.slice(index + 1)]);
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
    productApi.removeProduct({ token, programId: currentProgram.id, product: item })
    .then((res) => {     
      const arr = products.filter((elem) => elem.id !== res);
      setProducts(arr);
      setFilteredProducts(arr);
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

  function openRemoveProductPopup(program) {
    setCurrentProduct(program);
    setIsOpenRemoveProductPopup(true);
  }

  function closeProductPopup() {
    setIsOpenAddProductPopup(false);
    setIsOpenEditProductPopup(false);
    setIsOpenRemoveProductPopup(false);
    setIsShowRequestError({ isShow: false, text: '' });
  }

  function handleSearch(data) {
    setFilteredProducts(data);
  }

  function openProgram(product) {
    navigate('/program/' + currentProgram.id + '/product/' + product.id);
  }

  React.useEffect(() => {
    getProducts();
    return(() => {
      setProducts([]);
      setCurrentProduct({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='product'>
      {
        isLoadingPage 
        ?
        <Preloader />
        :
        <>

          <div className='section__header'>
            <Search type='medium' id='program' data={products} onSearch={handleSearch} />
            <button className='section__header-btn' type='button' onClick={openAddProductPopup}>Создать продукт</button>
          </div>

          <ProductTable
            products={filteredProducts}
            onOpen={openProgram}
            onEdit={openEditProductPopup}
            onRemove={openRemoveProductPopup}
          />

        </>
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
    </div>
  )
}

export default Product; 



