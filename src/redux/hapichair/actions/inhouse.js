// redux
import { common } from '@redux/combineActions';

import {
  createInhouseDiamond,
  fetchInhouseDiamondList,
  fetchInhouseDiamondById,
  updateInhouseDiamondById,
  deleteInhouseDiamondById,
  batchRemoveInhouseDiamondById,
} from '@service/api/inhouse';

import * as types from '../types';

export const getInhouseDiamondList = (payload) => async (dispatch) => {
  try {    
    const res = await fetchInhouseDiamondList(payload);
    const { data: { docs } } = res;
    await dispatch({
      type: types.HCHAIR_SET_INHOUSE_LIST,
      payload: docs,
    });
    return res;
  } catch {
    return { success: false, data: undefined };
  }
};

export const updateInhouseDiamond = (payload) => async (dispatch) => {
  try {
    await dispatch(common.ui.setLoading());
    await updateInhouseDiamondById(payload);
    await dispatch(common.ui.clearLoading());

    return true;
  } catch {
    return false;
  }
};

export const addInhouseDiamond = (params) => async () => {
  const res = await createInhouseDiamond(params);
  return res;
};

export const setInhouseDetails = (payload) => ({
  type: types.HCHAIR_SET_INHOUSE_DETAILS,
  payload,
});

export const getInhouseDiamond = (inhouseId) => async (dispatch) => {
  const res = await fetchInhouseDiamondById(inhouseId);
  const { success, data } = res;
  if (success) {
    await dispatch(setInhouseDetails(data));
  }
  return res;
};

export const resetInhouseDiamondDetails = () => ({
  type: types.HCHAIR_SET_INHOUSE_DETAILS,
  payload: undefined,
});

export const removeInhouseDiamond = (payload) => async () => {
  const res = await deleteInhouseDiamondById(payload);
  return res;
};

export const batchRemoveInhouseDiamond = (payload) => async () => {
  const res = await batchRemoveInhouseDiamondById(payload);
  return res;
};
