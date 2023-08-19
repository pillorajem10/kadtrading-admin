// service
import {
  fetchProductById,
  fetchProductList,
  fetchDeliveryOptionOverride,
  batchUpdateProductById,
  cloneProductById,
  removeProductById,
  batchRemoveProductById,
  fetchMultipleProduct,
  fetchProductBriefsByMerchantId,
  createDeliveryOptionOverride,
  updateDeliveryOptionOverride,
  cloneVariant,
  deleteVariant,
  productExport,
  createProduct,
  updateProductById,
} from '@service/api/product2b';

import { fetchMerchantById } from '@service/api/merchant2b';
import { renewImageUrl } from '@service/api/common';

// utils
import { normalizeBreakTagToString } from '@utils/methods';

import * as types from '../types';

export const setProductDetails = (payload) => ({
  type: types.HCHAIR_SET_PRODUCT_DETAILS,
  payload,
});

export const getProductList = (payload) => async (dispatch) => {
  const res = await fetchProductList(payload);

  const { success, data } = res;

  console.log('[GETPRODUCTLIST] ', data);
  
  if (success) {
    dispatch({
      type: types.HCHAIR_SET_PRODUCT_LIST,
      payload: data.docs,
    });
  }
  return res;
};

export const getProductDeliveryOptionOverride = (productId) => async (dispatch) => {
  try {
    const res = await fetchDeliveryOptionOverride(productId);
    const { success, data } = res;

    if (success) {
      dispatch({
        type: types.HCHAIR_SET_PRODUCT_DELIVERY_OPTION_OVERRIDE,
        payload: data,
      });
    }
    return true;
  } catch {
    return null;
  }
};

export const getMerchantDeliveryOptions = (merchantId) => async (dispatch) => {
  try {
    const res = await fetchMerchantById(merchantId);
    const { success, data } = res;

    if (success) {
      const { deliveryOptions } = data;
      dispatch({
        type: types.HCHAIR_SET_MERCHANT_DELIVERY_OPTION,
        payload: deliveryOptions,
      });
    }
    return true;
  } catch {
    return null;
  }
};

export const getProductById = (productId) => async (dispatch) => {
  const res = await fetchProductById(productId);
  const { success, data } = res;

  console.log('[getProductById] ', data);

  if (success) {
    // await dispatch(getProductDeliveryOptionOverride(productId));
    // await dispatch(getMerchantDeliveryOptions(data.merchantId));

    // const categories = data.categories.map((c) => c.id) ?? [];
    const descriptions = data.descriptions.map((desc) => {
      return {
        ...desc,
        // eslint-disable-next-line no-useless-escape
        content: normalizeBreakTagToString(desc.content),
      };
    });

    const materials =
      data.materials && data.materials.trim() !== '' ? data.materials.split(',') : undefined;

    const tags = data.tags && data.tags.trim() !== '' ? data.tags.split(',') : undefined;

    const modProduct = {
      ...data,
      descriptions,
      materials,
      tags,
    };

    console.log('[getProductById] ', modProduct);
    await dispatch(setProductDetails(modProduct));
  }
  return res;
};

export const createDeliveryOption = (payload) => async (_, getState) => {
  const { id: productId } = payload;
  const {
    hchair: {
      products: { deliveryOptions },
    },
  } = getState();

  if (!productId) return;

  if (!deliveryOptions || deliveryOptions?.length === 0) return;

  const payloads = deliveryOptions?.map(({ sourceId, minEddWeeks, maxEddWeeks }) => ({
    productId,
    sourceId,
    minEddWeeks,
    maxEddWeeks,
  }));

  await Promise.all(
    payloads.map((deliveryOptPayload) => createDeliveryOptionOverride(deliveryOptPayload)),
  );
};

export const simpleUpdateProduct = (payload) => async () => {
  try {
    await updateProductById(payload);
    return true;
  } catch {
    return false;
  }
};

export const batchUpdateProduct = (payload) => async () => {
  const res = await batchUpdateProductById(payload);
  return res;
};

export const removeProduct = (payload) => async () => {
  const res = await removeProductById(payload);
  return res;
};

export const batchRemoveProduct = (payload) => async () => {
  const res = await batchRemoveProductById(payload);
  return res;
};

export const cloneProduct = (payload) => async () => {
  const res = await cloneProductById(payload);
  return res;
};

export const updateProductForm = (productForm) => ({
  type: types.HCHAIR_UPDATE_PRODUCT_FORM,
  payload: productForm,
});

export const getMultipleProduct = (payload) => () => {
  return fetchMultipleProduct(payload).then((res) => {
    return res;
  });
};

export const getProductBriefs = (payload) => async () => {
  const res = await fetchProductBriefsByMerchantId(payload);
  return res;
};

export const addDeliveryOptionOverrideToList = (payload) => ({
  type: types.HCHAIR_ADD_NEW_DELIVERY_OPTION_OVERRIDE,
  payload,
});

export const createNewDeliveryOptionOverride = (payload) => async (dispatch) => {
  const { productId, sourceId, minEddWeeks, maxEddWeeks } = payload;
  const deliveryOptionPayload = {
    sourceId,
    minEddWeeks,
    maxEddWeeks,
    productId,
  };

  const res = await createDeliveryOptionOverride(deliveryOptionPayload);
  const { success } = res;

  if (success) {
    dispatch(getProductDeliveryOptionOverride(productId));
  }
};

export const updateExistingDeliveryOptionOverride = (payload) => async (dispatch) => {
  const { productId, sourceId, id, minEddWeeks, maxEddWeeks } = payload;

  const deliveryOptionPayload = {
    sourceId,
    id,
    minEddWeeks,
    maxEddWeeks,
    productId,
  };

  const res = await updateDeliveryOptionOverride(deliveryOptionPayload);
  const { success } = res;

  if (success) {
    dispatch(getProductDeliveryOptionOverride(productId));
  }
};

export const reset = () => ({ type: types.HCHAIR_RESET_PRODUCT_STATE });

export const resetProductDetails = () => ({ type: types.HCHAIR_RESET_PRODUCT_DETAILS });

export const duplicateVariant = (payload) => async () => {
  const res = await cloneVariant(payload);
  return res;
};

export const removeVariant = (payload) => async () => {
  const res = await deleteVariant(payload);
  return res;
};

export const setProduct = (productForm) => ({
  type: types.HCHAIR_SET_PRODUCT,
  payload: productForm,
});

export const setProductForm = (productForm) => ({
  type: types.HCHAIR_SET_PRODUCT_FORM,
  payload: productForm,
});

export const exportProduct = (payload) => async () => {
  const res = await productExport(payload);
  return res;
};


export const updateProduct = (payload) => async () => {
  const res = await updateProductById(payload);
  return res;
};

export const addProduct = (payload) => async () => {
  const res = await createProduct(payload);
  return res;
};

export const renewImage = (payload) => async () => {
  const res = await renewImageUrl(payload);
  return res;
};
