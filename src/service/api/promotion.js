// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch promotion list
 * @param {*} payload
 */
export async function fetchPromotions(payload) {
  return GET(`/transactions/admin/promotions?${methods.convertQueryString(payload)}`);
}

/**
 * update promotion by id
 * @param {*} payload
 */
export async function updatePromotionById(payload) {
  const { id, ...restPayload } = payload;
  if (!id) return false;

  return PUT(`/transactions/promotions/${id}`, restPayload);
}

/**
 * delete promotion by id
 * @param {*} payload
 */
export async function deletePromotionById(promotionId) {
  return DELETE(`/transactions/promotions/${promotionId}`);
}

/**
 * fetch promotion by id
 * @param {*} payload
 */
export async function fetchPromotionById(promotionId) {
  return GET(`/transactions/admin/promotions/${promotionId}`);
}

/**
 * create promotion
 * @param {*} payload
 */
export async function createPromotion(payload) {
  return POST(`/transactions/promotions`, payload);
}

/**
 * check conflict
 * @param {*} payload
 */
export async function checkConflict(promotionId) {
  return GET(`/transactions/admin/promotions/${promotionId}/conflicts`);
}
