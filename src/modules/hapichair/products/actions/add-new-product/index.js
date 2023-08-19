import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { hchair } from '@redux/combineActions';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import ProductForm from '../../components/ProductForm';

const AddNewProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSave = async (values) => {
    const { materials, tags } = values;
    const modValues = {
      ...values,
      materials: materials ? materials.toString() : '',
      tags: tags ? tags.toString() : '',
      variants: values?.variants?.map((variant) => {
        const { colour, group, images,
          qtyAvailable, type, ...restVariant } = variant;

        return {
          ...restVariant,
          icon: variant.color ? null : variant.icon,
          label: variant.color ? 'COLOR' : 'ICON',
          images: variant.images.map(img => ({
            name: '',
            type: 'IMAGE',
            url: img,
          })),
        }
      }),
    }

    const { success, data } = await dispatch(hchair.products.addProduct(modValues));

    if (success) {
      const { _id } = data;
      message.success('Product created successfully!');
      history.replace(`${ROUTE_PATHS.EDIT_PRODUCT}?id=${_id}`);
    }
  };

  return <ProductForm onSave={handleSave} />;
};

export default AddNewProduct;
