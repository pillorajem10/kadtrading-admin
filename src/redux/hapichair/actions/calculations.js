// redux
import { common } from '@redux/combineActions';

import {
  createCalculation,
  // createCalculationUser,
  fetchCalculationList,
  fetchCalculationById,
  updateCalculationById,
  batchUpdateCalculationById,
  // deleteCalculationById,
  removeCalculationById,
  batchRemoveCalculationById,
  // fetchDeliveryOptionsById
} from '@service/api/calculation2b';

import * as types from '../types';

export const getCalculationList = (payload) => async (dispatch) => {
  try {

    const res = await fetchCalculationList(payload);
    const { data: { docs } } = res;

    await dispatch({
      type: types.HCHAIR_SET_CALCULATION_LIST,
      payload: docs,
    });
    return res;
  } catch {
    return { success: false, data: undefined };
  }
};

export const updateCalculation = (payload) => async (dispatch) => {
  try {
    await dispatch(common.ui.setLoading());
    await updateCalculationById(payload);
    await dispatch(common.ui.clearLoading());

    return true;
  } catch {
    return false;
  }
};

export const setCalculationDetails = (payload) => ({
  type: types.HCHAIR_SET_CALCULATION_DETAILS,
  payload,
});

export const getCalculationById = (calculationId) => async (dispatch) => {
  const res = await fetchCalculationById(calculationId);

  const { success, data } = res;

  if (success) {
    await dispatch(setCalculationDetails(data));
  }

  return res;
};

/*
export const getCalculationById = (payload) => async (dispatch) => {
  const res = await fetchCalculationDetailsById(payload);

  const { success, data } = res;
  if (success) {
    dispatch({
      type: types.HCHAIR_SET_CALCULATION_DETAILS,
      payload: data,
    });
  }
  return res;
};
*/
/*
export const removeCalculationById = (payload) => () => {
  return deleteCalculationById(payload);
};
*/

export const resetCalculationDetails = () => ({
  type: types.HCHAIR_SET_CALCULATION_DETAILS,
  payload: undefined,
});

// existing actions below
export const addCalculation = (payload) => async () => {
  const res = await createCalculation(payload);
  return res;
};

export const getCalculationDetailsById = (payload) => () => {
  return fetchCalculationById(payload).then((res) => {
    return res;
  });
};

export const batchUpdateCalculation = (payload) => async () => {
  const res = await batchUpdateCalculationById(payload);
  return res;
};

export const removeCalculation = (payload) => async () => {
  const res = await removeCalculationById(payload);
  return res;
};

export const batchRemoveCalculation = (payload) => async () => {
  const res = await batchRemoveCalculationById(payload);
  return res;
};
