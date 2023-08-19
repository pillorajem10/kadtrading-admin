// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch calculation list
 */
export async function fetchCalculationList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/calcv/admin?${params}`);
}

/**
 * fetch calculation by calculation id
 * @param {*} calculationId
 */
export async function fetchCalculationById(calculationId) {
  return GET(`/calcv/admin/${calculationId}`);
}

/**
 * add calculation
 * @param {*} payload
 */
export async function createCalculation(payload) {
  return POST(`/calcv/admin`, payload);
}

/**
 * update calculation by id
 * @param {*} payload
 */
export async function updateCalculationById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/calcv/admin/${id}`, rest);
}

/**
 * batch update calculation by id
 * @param {*} payload
 */
export async function batchUpdateCalculationById(payload) {
  return PUT('/account-api/admin/corporate-buyers', payload);
}

/**
 * remove calculation by id
 * @param {*} payload
 */
export async function removeCalculationById(payload) {
  return DELETE(`/calcv/admin/${payload}`);
}

/**
 * batch remove calculation by id
 * @param {*} payload
 */
export async function batchRemoveCalculationById(payload) {
  return DELETE(`/calcv/admin?ids=${payload}`);
}

/**
 * fetch updated exchange rate
 */
 export async function fetchUpdatedRates(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/curr/admin?${params}`);
}