// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch merchant list
 */
export async function fetchMerchantList(payload) {
  return GET(`/merchants?${methods.convertQueryString(payload)}`);
}

/**
 * fetch merchant by merchant id
 * @param {*} merchantId
 */
export async function fetchMerchantById(merchantId) {
  return GET(`/merchants/${merchantId}/details`);
}

/**
 * fetch merchant details by id
 * @param {*} payload
 */
export async function fetchMerchantDetailsById(payload) {
  return GET(`/merchants/${payload}/details`);
}

export const createMerchant = (payload) => {
  return POST(`/merchants`, payload);
};

export const createOrUpdateMerchant = (payload) => {
  return PUT(`/merchants`, payload);
};

export const updateMerchantById = (payload) => {
  const { id, ...restPayload } = payload;
  return PUT(`/merchants/${id}`, restPayload);
};

export const deleteMerchantById = (id) => {
  return DELETE(`/merchants/${id}`);
};
