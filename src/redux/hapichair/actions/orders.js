import {
  fetchTransactionOrders,
  fetchTransactionOrderById,
  captureTransactionOrderById,
  updateTransactionOrderById,
  orderPaymentEmail,
  createDeliveryOrder,
  deleteDeliveryOrder,
} from '@service/api/transaction2b';

import * as types from '../types';

export const getTransactionOrders = (payload) => async (dispatch, getState) => {
  const {
    hchair: { orders },
  } = getState();

  const { pagination } = orders;
  const { pageIndex, pageSize } = pagination;

  const searchPayload = {
    pageIndex,
    pageSize,
    ...payload,
  };

  const res = await fetchTransactionOrders(searchPayload);

  const { success, data } = res;

  if (success) {
    dispatch({
      type: types.HCHAIR_SET_ORDER_LIST,
      payload: data,
    });
  }

  return res;
};

export const updateHeaderTabIndex = (headerTabIndex) => ({
  type: types.HCHAIR_UPDATE_HEADER_TAB_INDEX,
  payload: headerTabIndex,
});

export const setTransactionOrder = (orderDetail) => ({
  type: types.HCHAIR_SET_ORDER_DETAIL,
  payload: orderDetail,
});

export const getTransactionOrderById = (orderId) => (dispatch) => {
  return fetchTransactionOrderById(orderId).then((res) => {
    const { success, data } = res;

    if (success) {
      dispatch(setTransactionOrder(data));
    }
  });
};

export const refreshDetails = () => async (dispatch, getState) => {
  const {
    hchair: { orders },
  } = getState();

  if (!orders?.orderDetail) return;

  dispatch(getTransactionOrderById(orders.orderDetail?.id));
};

export const updateTransactionOrder = (payload) => async () => {
  const res = await updateTransactionOrderById(payload);
  return res;
};

export const captureTransactionOrder = (payload) => async () => {
  const res = await captureTransactionOrderById(payload);
  return res;
};

export const sendPaymentEmail = (payload) => async () => {
  const res = await orderPaymentEmail(payload);

  return res;
};

export const createNewDeliveryOrder = (payload) => async (dispatch) => {
  try {
    const { success } = await createDeliveryOrder(payload);

    if (success) {
      dispatch(refreshDetails());
    }
    return true;
  } catch {
    return false;
  }
};

export const removeDeliveryOrder = (payload) => async (dispatch) => {
  try {
    const { success } = await deleteDeliveryOrder(payload);

    if (success) {
      dispatch(refreshDetails());
    }
    return true;
  } catch {
    return false;
  }
};
