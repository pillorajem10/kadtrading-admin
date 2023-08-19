// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch merchant list
 */
export async function fetchMerchantList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/merchants?${params}`);
}

/**
 * fetch merchant by merchant id
 * @param {*} merchantId
 */
export async function fetchMerchantById(merchantId) {
  return GET(`/merchants/${merchantId}`);
}

/**
 * fetch merchant details by id
 * @param {*} payload
 */
export async function fetchMerchantDetailsById(payload) {
  return GET(`/merchants/${payload}`);
}

/**
 * create merchant user
 * @param {*} payload
 */
export async function createMerchantUser(payload) {
  return POST(`/account-api/users/from-merchant`, payload);
}

/**
 * create or update merchant
 * @param {*} payload
 */
export async function createUpdateMerchant(payload) {
  return PUT(`/merchants`, payload);
}

/**
 * update merchant
 * @param {*} payload
 */

export const updateMerchantById = (payload) => {
  const { id, ...restPayload } = payload;
  return PUT(`/merchants/${id}`, restPayload);
};

/**
 * batch update merchant by id
 * @param {*} payload
 */
export async function batchUpdateMerchantById(payload) {
  return PUT('/merchants', payload);
}

/**
 * remove merchant by id
 * @param {*} payload
 */
export async function deleteMerchantById(payload) {
  return DELETE(`/merchants/${payload}`);
}

/**
 * batch remove merchant by id
 * @param {*} payload
 */
export async function batchDeleteMerchantById(payload) {
  return DELETE(`/merchants?ids=${payload}`);
}

/**
 * fetch delivery options
 * @param {*} payload
 */
export async function fetchDeliveryOptionsById(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/products/delivery-options?${params}`);
}




/**
 * create merchant
 * @param {*} payload
 */
export async function createMerchant(payload) {
  return POST(`/merchants`, payload);
}
