import React, { useCallback, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// common utils
import { difference } from '@utils/methods';

// components
import LoadComponent from '@components/LoadComponent';
import ProductForm from '../../components/ProductForm';

// utils
import { mapDetailsToValues } from '../../utils';

const EditProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.hchair.products.productDetails);

  const getProductDetails = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    dispatch(hchair.products.getProductById(id));
  }, [dispatch, location]);

  const handleSave = async (values) => {
    const { descriptions } = values;
    const modDescriptions = descriptions.map((desc) => {
      const { tempId, ...restDesc } = desc;
      return restDesc;
    });

    const modValues = {
      ...values,
      descriptions: modDescriptions,
    };

    const changedFields = difference(modValues, mapDetailsToValues(productDetails));
    const fieldsToUpdate = {
      ...changedFields,
      variants: changedFields?.variants?.map((variant) => {
        const { colour, group, images, qtyAvailable, type, ...restVariant } = variant;

        return {
          ...restVariant,
          images: variant.images.map((img) => ({
            name: '',
            type: 'IMAGE',
            url: img.url,
          })),
        };
      }),
    };

    const { _id } = productDetails;
    const payload = { id: _id, ...fieldsToUpdate };
    console.log('[UPDATE PRODUCT] ', payload);
    
    const success = await dispatch(hchair.products.updateProduct(payload));

    if (success) {
      message.success('Product updated successfully!');
      await dispatch(hchair.products.getProductById(_id));
    }
  };

  useEffect(() => {
    getProductDetails();

    return () => {
      dispatch(hchair.products.setProductDetails(null));
    };
  }, [dispatch, getProductDetails]);

  if (!productDetails) return <LoadComponent />;

  const initialValues = mapDetailsToValues(productDetails);
  console.log('[INITIALVALUES initialValues, productDetails] ', initialValues, productDetails);

  return <ProductForm initialValues={initialValues} onSave={handleSave} />;
};

export default EditProduct;
