// redux
import { common } from '@redux/combineActions';

import {
  createMerchant,
  createMerchantUser,
  fetchMerchantList,
  fetchMerchantById,
  fetchMerchantDetailsById,
  createUpdateMerchant,
  updateMerchantById,
  batchUpdateMerchantById,
  deleteMerchantById,
  batchDeleteMerchantById,
  fetchDeliveryOptionsById
} from '@service/api/merchant2b';

import * as types from '../types';

export const getMerchantList = (payload) => async (dispatch) => {
  try {
    console.log('[getMerchantList] ', payload);
    
    const res = await fetchMerchantList(payload);
    const { data: { docs } } = res;
    await dispatch({
      type: types.HCHAIR_SET_MERCHANT_LIST,
      payload: docs,
    });
    return res;
  } catch {
    return { success: false, data: undefined };
  }
};

export const upsertMerchant = (payload) => async () => {
  try {
    await createUpdateMerchant(payload);
    return true;
  } catch {
    return false;
  }
};

export const updateMerchant = (payload) => async (dispatch) => {
  try {
    await dispatch(common.ui.setLoading());
    await updateMerchantById(payload);
    await dispatch(common.ui.clearLoading());

    return true;
  } catch {
    return false;
  }
};

export const getMerchant = (merchantId) => async () => {
  const res = await fetchMerchantById(merchantId);
  return res;
};

export const getMerchantById = (payload) => async (dispatch) => {
  const res = await fetchMerchantDetailsById(payload);

  const { success, data } = res;
  if (success) {
    dispatch({
      type: types.HCHAIR_SET_MERCHANT_DETAILS,
      payload: data,
    });
  }
  return res;
};

export const removeMerchantById = (payload) => () => {
  return deleteMerchantById(payload);
};

export const resetMerchantDetails = () => ({
  type: types.HCHAIR_SET_MERCHANT_DETAILS,
  payload: undefined,
});

// existing actions below
export const addMerchantUser = (payload) => async () => {
  const res = await createMerchantUser(payload);
  return res;
};

export const getMerchantDetailsById = (payload) => () => {
  return fetchMerchantDetailsById(payload).then((res) => {
    return res;
  });
};

export const getDeliveryOptionsByMerchantId = (payload) => () => {
  return fetchDeliveryOptionsById(payload).then((res) => {
    return res;
  });
};

export const addUpdateMerchant = (payload) => async () => {
  const res = await createUpdateMerchant(payload);
  return res;
};

export const batchUpdateMerchant = (payload) => async () => {
  const res = await batchUpdateMerchantById(payload);
  return res;
};

export const removeMerchant = (payload) => async () => {
  const res = await deleteMerchantById(payload);
  return res;
};

export const batchRemoveMerchant = (payload) => async () => {
  const res = await batchDeleteMerchantById(payload);
  return res;
};
