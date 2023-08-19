// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST } from '../request';

/**
 * fetch settings
 * @param {*} payload
 */
export async function fetchSettings(payload) {
  return GET(`/products/settings`, payload);
}

/**
 * create product labels
 * @param {*} payload
 */
export async function postSettings(payload) {
  return POST(`/products/settings`, payload);
}

/**
 * delete custom keys
 * @param {*} payload
 */
export async function deleteCustomKey(payload) {
  const params = methods.convertQueryString(payload);
  return DELETE(`/products/settings?${params}`);
}
