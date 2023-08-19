// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch transaction order
 * @param {*} payload
 */
export async function fetchTransactionOrders(payload) {
  return GET(`/transactions/admin/transactions?${methods.convertQueryString(payload)}`);
}

/**
 * fetch transaction order by id
 * @param {*} orderId
 */
export async function fetchTransactionOrderById(orderId) {
  return GET(
    `/transactions/admin/transactions/${orderId}?showOrders=true&showAddresses=true`,
  );
}

/**
 * update transaction order by id
 * @param {*} payload
 */
export async function updateTransactionOrderById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/transactions/admin/orders/${id}`, rest);
}

/**
 * capture transaction order by id
 * @param {*} payload
 */
export async function captureTransactionOrderById(payload) {
  return PUT(`/transactions/admin/transactions/capture/${payload}`);
}

/**
 * fetch voucher codes
 * @param {*} payload
 */

export async function fetchVoucherCodes(payload) {
  return GET(`/transactions/admin/vouchers?${methods.convertQueryString(payload)}`);
}

/**
 * fetch voucher code by id
 * @param {*} payload
 */

export async function fetchVoucherCodeById(payload) {
  return GET(`/transactions/admin/vouchers/${payload}`);
}

/**
 * create voucher code
 * @param {*} payload
 */

export async function createVoucherCode(payload) {
  return POST(`/transactions/vouchers`, payload);
}

/**
 * update voucher code by id
 * @param {*} payload
 */

export async function updateVoucherCode(payload) {
  return PUT(`/transactions/vouchers/${payload.id}`, payload);
}

/**
 * delete voucher code
 * @param {*} payload
 */

export async function deleteVoucherCode(payload) {
  return DELETE(`/transactions/vouchers/${payload}`);
}

export const orderPaymentEmail = async (payload) => {
  return POST('/transactions/emails/order-payment', payload);
};

export const createDeliveryOrder = async (payload) => {
  return POST('/transactions/delivery-orders', payload);
};

export const deleteDeliveryOrder = async (payload) => {
  const { id } = payload;
  return DELETE(`/transactions/delivery-orders/${id}`);
};
