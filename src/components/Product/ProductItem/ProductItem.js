import React from 'react';
import './ProductItem.css';
import * as productApi from '../../../utils/product.js';
import { useParams } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader.js';
import ProductStages from '../ProductStages/ProductStages.js';
import Section from '../../Section/Section.js';

function ProductItem({ currentProgram, isEditRights }) {

  const params = useParams();

  const [currentProduct, setCurrentProduct] = React.useState({});

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function getProduct() {
    const token = localStorage.getItem('token');
    setIsLoadingPage(true);
    productApi.getProduct({ token, programId: currentProgram.id, productId: params.productId })
    .then((res) => {
      setCurrentProduct(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingPage(false);
    });
  }

  React.useEffect(() => {
    getProduct();
    return(() => {
      setCurrentProduct({});
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
      <Section title={currentProduct.name} heightType='content' headerType='large' >
        <ProductStages 
          currentProgram={currentProgram} 
          currentProduct={currentProduct} 
        />

      </Section>
    }
    </>
  )
}

export default ProductItem;
