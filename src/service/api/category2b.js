// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * upgrade category
 * @param {*} payload
 */

export async function updateCategoryByParam(payload) {
  return PUT(`/categories`, payload);
}


/**
 * fetch root category
 * @param {*} payload
 */
export async function fetchRootCategory(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/categories?${params}`);
}

/**
 * fetch product list
 * @param {*} payload
 */
export async function fetchCategoryList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/categories?${params}`);
}

/**
 * get product by id
 * @param {*} payload
 */

export async function fetchCategoryById(payload) {
  return GET(`/categories/${payload}`);
}

/**
 * update product by id
 * @param {*} payload
 */
export async function updateCategoryById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/categories/${id}`, rest);
}

/**
 * remove product by id
 * @param {*} payload
 */
export async function removeCategoryById(payload) {
  return DELETE(`/categories/${payload}`);
}

/**
 * create product
 * @param {*} payload
 */
export async function createCategory(payload) {
  return POST(`/categories`, payload);
}

/**
 * batch update product by id
 * @param {*} payload
 */
export async function batchUpdateCategoryById(payload) {
  return PUT('/products/admin/categories', payload);
}

/**
 * batch remove product by id
 * @param {*} payload
 */
export async function batchRemoveCategoryById(payload) {
  return DELETE(`/products/admin/categories?ids=${payload}`);
}
