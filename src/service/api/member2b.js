// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch member list
 */
export async function fetchMemberList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/vsers/admin?${params}`);
}

/**
 * fetch member by member id
 * @param {*} memberId
 */
export async function fetchMemberById(memberId) {
  return GET(`/vsers/admin/${memberId}`);
}

/**
 * add member
 * @param {*} payload
 */
export async function createMember(payload) {
  return POST(`/account-api/admin/corporate-buyers`, payload);
}

/**
 * create or update member
 * @param {*} payload
 */
export async function createUpdateMember(payload) {
  return PUT(`/account-api/corporate-buyers`, payload);
}

/**
 * update member by id
 * @param {*} payload
 */
export async function updateMemberById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/vsers/admin/${id}`, rest);
}

/**
 * batch update member by id
 * @param {*} payload
 */
export async function batchUpdateMemberById(payload) {
  return PUT('/account-api/admin/corporate-buyers', payload);
}

/**
 * remove member by id
 * @param {*} payload
 */
export async function removeMemberById(payload) {
  return DELETE(`/account-api/admin/corporate-buyers/${payload}`);
}

/**
 * batch remove member by id
 * @param {*} payload
 */
export async function batchRemoveMemberById(payload) {
  return DELETE(`/account-api/admin/corporate-buyers?ids=${payload}`);
}

/**
 * fetch product rates
 */
export async function fetchProductRatesList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/products/admin/product-rates?${params}`);
}

/**
 * create corp price tier
 * @param {*} payload
 */
export async function createPriceTier(payload) {
  return POST(`/products/price-tiers`, payload);
}

/**
 * update corp price tiers
 * @param {*} payload
 */
export async function updatePriceTiers(payload) {
  const { id, ...rest } = payload;
  return PUT(`/products/price-tiers/${id}`, rest);
}

/**
 * clear price tiers
 * @param {*} payload
 */
export async function clearPriceTiers(payload) {
  return PUT('/products/price-tiers', payload);
}

/**
 * create corporate price
 * @param {*} payload
 */
export async function createCorporatePrice(payload) {
  return POST(`/products/corporate-prices`, payload);
}

/**
 * update corporate price
 * @param {*} payload
 */
export async function updateCorporatePrice(payload) {
  const { id, ...rest } = payload;
  return PUT(`/products/corporate-prices/${id}`, rest);
}

/**
 * remove corporate price
 * @param {*} payload
 */
export async function removeCorporatePriceById(payload) {
  return DELETE(`/products/corporate-prices/${payload}`);
}
