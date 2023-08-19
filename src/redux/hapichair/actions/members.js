/*
import {
  fetchMemberList,
  fetchMemberById,
  createUpdateMember,
  createMember,
  updateMemberById,
  batchUpdateMemberById,
  removeMemberById,
  batchRemoveMemberById,
  fetchProductRatesList,
  updatePriceTiers,
  updateCorporatePrice,
  createCorporatePrice,
  createPriceTier,
  clearPriceTiers,
  removeCorporatePriceById,
} from '@service/api/member2b';

import * as types from '../types';

import { mapSearchPayload, tableKey } from '../../../modules/hapichair/members/utils';

export const setMemberDetails = (payload) => ({
  type: types.HCHAIR_SET_MEMBER_DETAILS,
  payload,
});

export const setProductRatesList = (params) => ({
  type: types.HCHAIR_SET_PRODUCT_RATES,
  payload: params,
});

export const setProductRate = (params) => ({
  type: types.HCHAIR_SET_PRODUCT_RATE,
  payload: params,
});

export const setMember = (memberForm) => ({
  type: types.HCHAIR_SET_MEMBER,
  payload: memberForm,
});

export const setMemberForm = (memberForm) => ({
  type: types.HCHAIR_SET_MEMBER_FORM,
  payload: memberForm,
});

export const updateMemberForm = (memberForm) => ({
  type: types.HCHAIR_UPDATE_MEMBER_FORM,
  payload: memberForm,
});

export const getMemberList = (payload) => async (dispatch) => {
  const res = await fetchMemberList(payload);

  const { success, data } = res;

  if (success) {
    console.log("DATAAAA", data)
    dispatch({
      type: types.HCHAIR_SET_MEMBER_LIST,
      payload: data,
    });
  }
  return res;
};

export const refreshListing = () => async (dispatch, getState) => {
  const {
    common: { table },
  } = getState();

  if (table[tableKey]?.filterValues) {
    const searchPayload = mapSearchPayload(table[tableKey]?.filterValues);
    await dispatch(getMemberList(searchPayload));
  }
};

const updateProductRateStates = async (corpId, productId, dispatch) => {
  let productRates;
  let productRate;

  const payloadProductRates = { corpId, sortBy: 'updateTime', sortOrder: 'desc', pageIndex: 1, pageSize: 50 };
  const resProductRates = await fetchProductRatesList(payloadProductRates);

  if (resProductRates.success) {
    productRates = resProductRates.data;
    productRate = resProductRates.data.find(pr => pr.id === productId);
    dispatch({
      type: types.HCHAIR_SET_PRODUCT_RATE_STATES,
      payload: { productRates, productRate },
    });
  }
};

export const updateMemberPriceTier = (payload) => async (dispatch) => {
  const { productId, ...restPayload } = payload;
  const res = await updatePriceTiers(restPayload);
  const { success } = res;

  if (success) {
    const { corpId } = restPayload;
    updateProductRateStates(corpId, productId, dispatch);
  }

  return res;
};

export const addPriceTier = (payload) => async (dispatch) => {
  const res = await createPriceTier(payload);
  const { success } = res;

  if (success) {
    const { corpId, productId } = payload;
    updateProductRateStates(corpId, productId, dispatch);
  }
  return res;
};

export const addCorporatePrice = (payload) => async (dispatch) => {
  const res = await createCorporatePrice(payload);
  const { success } = res;

  if (success) {
    const { corpId, productId } = payload;
    updateProductRateStates(corpId, productId, dispatch);
  }

  return res;
};

export const getProductRatesList = (payload) => async (dispatch) => {
  const res = await fetchProductRatesList(payload);

  const { success, data } = res;

  if (success) {
    dispatch({
      type: types.HCHAIR_SET_PRODUCT_RATES,
      payload: data,
    });
  }
  return res;
};

export const getMemberById = (memberId) => async (dispatch) => {
  const res = await fetchMemberById(memberId);

  const { success, data } = res;

  if (success) {
    await dispatch(setMemberDetails(data));
  }

  return res;
};

export const addUpdateMember = (payload) => async () => {
  const res = await createUpdateMember(payload);
  return res;
};

export const addMember = (payload) => async () => {
  const res = await createMember(payload);
  return res;
};

export const updateMember = (payload) => async () => {
  const res = await updateMemberById(payload);
  return res;
};

export const batchUpdateMember = (payload) => async () => {
  const res = await batchUpdateMemberById(payload);
  return res;
};

export const removeMember = (payload) => async () => {
  const res = await removeMemberById(payload);
  return res;
};

export const batchRemoveMember = (payload) => async () => {
  const res = await batchRemoveMemberById(payload);
  return res;
};

export const updateMemberCorporatePrice = (payload) => async (dispatch) => {
  const { corpId, productId, ...restPayload } = payload;
  const res = await updateCorporatePrice(restPayload);
  const { success } = res;

  if (success) {
    updateProductRateStates(corpId, productId, dispatch);
  }

  return res;
};

export const resetProductRatePrices = (payload) => async () => {
  const res = await clearPriceTiers(payload);
  return res;
};

export const removeCorporatePrice = (payload) => async () => {
  const res = await removeCorporatePriceById(payload);
  return res;
};

export const reset = () => ({ type: types.HCHAIR_RESET_MEMBER_STATE });

export const resetMemberDetails = () => ({ type: types.HCHAIR_RESET_MEMBER_DETAILS });
*/
// redux
import { common } from '@redux/combineActions';

import {
  createMember,
  // createMemberUser,
  fetchMemberList,
  fetchMemberById,
  // fetchMemberDetailsById,
  createUpdateMember,
  updateMemberById,
  batchUpdateMemberById,
  // deleteMemberById,
  removeMemberById,
  batchRemoveMemberById,
  // fetchDeliveryOptionsById
} from '@service/api/member2b';

import * as types from '../types';

export const getMemberList = (payload) => async (dispatch) => {
  try {

    const res = await fetchMemberList(payload);
    const { data: { docs } } = res;
    await dispatch({
      type: types.HCHAIR_SET_MEMBER_LIST,
      payload: docs,
    });
    return res;
  } catch {
    return { success: false, data: undefined };
  }
};

export const upsertMember = (payload) => async () => {
  try {
    await createUpdateMember(payload);
    return true;
  } catch {
    return false;
  }
};

export const updateMember = (payload) => async (dispatch) => {
  try {
    await dispatch(common.ui.setLoading());
    await updateMemberById(payload);
    await dispatch(common.ui.clearLoading());

    return true;
  } catch {
    return false;
  }
};

export const setMemberDetails = (payload) => ({
  type: types.HCHAIR_SET_MEMBER_DETAILS,
  payload,
});

export const getMemberById = (memberId) => async (dispatch) => {
  const res = await fetchMemberById(memberId);

  const { success, data } = res;

  if (success) {
    await dispatch(setMemberDetails(data));
  }

  return res;
};

/*
export const getMemberById = (payload) => async (dispatch) => {
  const res = await fetchMemberDetailsById(payload);

  const { success, data } = res;
  if (success) {
    dispatch({
      type: types.HCHAIR_SET_MEMBER_DETAILS,
      payload: data,
    });
  }
  return res;
};
*/
/*
export const removeMemberById = (payload) => () => {
  return deleteMemberById(payload);
};
*/

export const resetMemberDetails = () => ({
  type: types.HCHAIR_SET_MEMBER_DETAILS,
  payload: undefined,
});

// existing actions below
export const addMemberUser = (payload) => async () => {
  const res = await createMember(payload);
  return res;
};

export const getMemberDetailsById = (payload) => () => {
  return fetchMemberById(payload).then((res) => {
    return res;
  });
};


/*
export const getDeliveryOptionsByMemberId = (payload) => () => {
  return fetchDeliveryOptionsById(payload).then((res) => {
    return res;
  });
};
*/

export const addUpdateMember = (payload) => async () => {
  const res = await createUpdateMember(payload);
  return res;
};

export const batchUpdateMember = (payload) => async () => {
  const res = await batchUpdateMemberById(payload);
  return res;
};

export const removeMember = (payload) => async () => {
  const res = await removeMemberById(payload);
  return res;
};

export const batchRemoveMember = (payload) => async () => {
  const res = await batchRemoveMemberById(payload);
  return res;
};
