import axios from 'axios';

// components
import { message } from 'antd';

// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

/**
 * fetch product list
 * @param {*} payload
 */
export async function fetchInhouseDiamondList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/product-api-v2/admin/inhouse?${params}`);
}

/**
 * get product by id
 * @param {*} payload
 */

export async function fetchInhouseDiamondById(payload) {
  return GET(`/product-api-v2/admin/inhouse/${payload}`);
}

/**
 * update product by id
 * @param {*} payload
 */
export async function updateInhouseDiamondById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/admin/inhouse/${id}`, rest);
}

/**
 * remove product by id
 * @param {*} payload
 */
export async function deleteInhouseDiamondById(payload) {
  return DELETE(`/product-api-v2/admin/inhouse/${payload}`);
}

/**
 * batch remove product by id
 * @param {*} payload
 */
export async function batchRemoveInhouseDiamondById(payload) {
  return DELETE(`/product-api-v2/admin/inhouse?ids=${payload}`);
}

/**
 * clone product by id
 * @param {*} payload
 */
export async function cloneInhouseDiamondById(payload) {
  return POST(`/product-api-v2/admin/inhouse/clone`, payload);
}

/**
 * create product
 * @param {*} payload
 */
export async function createInhouseDiamond(payload) {
  return POST(`/product-api-v2/admin/inhouse`, payload);
}

export async function inhouseDiamondExport(payload) {
  return axios(`/product-api-v2/admin/inhouse/download?${methods.convertQueryString(payload)}`, {    
    method: 'GET',
    responseType: 'blob',
  })
  .then((response) => {
    const file = new Blob([response.data], { type: 'application/octet-stream' });
    const fileURL = URL.createObjectURL(file);
      return fileURL;
    })
    .catch(() => {
      message.error('File does not exists');
    });
};
