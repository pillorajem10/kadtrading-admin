import axios from 'axios';

// components
import { message } from 'antd';

// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT, PUT_FORM_DATA } from '../request';

/**
 * clone product by id
 * @param {*} payload
 */
export async function fetchProductBriefsByMerchantId(payload) {
  return GET(`/product-api-v2/admin/product-briefs?${methods.convertQueryString(payload)}`);
}


/**
 * get category by parameters
 * @param {*} payload
 */
export async function fetchCategoryByParam(payload) {
  return GET(`/categories?${methods.convertQueryString(payload)}`);
}

/**
 * create parent category
 * @param {*} payload
 */

export async function addCategory(payload) {
  return POST(`/categories`, payload);
}

/**
 * delete category
 * @param {*} payload
 */

export async function deleteCategory(payload) {
  return DELETE(`/categories/${payload}`);
}

/**
 * upgrade category
 * @param {*} payload
 */

export async function updateCategoryByParam(payload) {
  return PUT(`/categories`, payload);
}

/**
 * upgrade category
 * @param {*} payload
 */

export async function updateCategoryById(payload) {
  const { id, ...restPayload } = payload;
  return PUT(`/categories/${id}`, restPayload);
}

/**
 * upgrade category
 * @param {*} payload
 */

export async function upgradeCategory(categoryId, payload) {
  return PUT(`/categories/${categoryId}`, payload);
}

/**
 * upgrade or creare category
 * @param {*} payload
 */

export async function upgradeOrCreateCategory(payload) {
  return PUT(`/categories`, payload);
}

export const createOrUpdateProductVariants = (payload) => {
  return PUT(`/product-api-v2/admin/products`, payload);
};

export const createOrUpdateProductOptions = (payload) => {
  return PUT(`/product-api-v2/admin/product-options`, payload);
};

export const batchDeleteProductOptions = (payload) => {
  return DELETE(`/product-api-v2/admin/product-options?ids=${payload}`);
};

export const fetchProductRecommendation = (productId) => {
  return GET(`/product-api-v2/admin/products/${productId}/recommendations`);
};

export const fetchProductRecommendationByMerchant = (productId) => {
  return GET(`/product-api-v2/admin/products/${productId}/recommendations?scope=MERCHANT`);
};

export const fetchProductRecommendationByMarketplace = (productId) => {
  return GET(`/product-api-v2/admin/products/${productId}/recommendations?scope=ALL`);
};

export const createProductRecommendation = (payload) => {
  const { id: productId, ...rest } = payload;
  if (!productId) {
    throw Error(`product id undefined: ${productId}`);
  }
  return PUT(`/product-api-v2/admin/products/${productId}/recommendations`, rest);
};

export const updateProductRecommendation = (payload) => {
  const { id: productId, ...rest } = payload;
  if (!productId) {
    throw Error(`product id undefined: ${productId}`);
  }
  return PUT(`/product-api-v2/admin/products/${productId}/recommendations`, rest);
};

export const createDeliveryOptionOverride = (payload) => {
  return POST(`/product-api-v2/delivery-option-overrides`, payload);
};

export const updateDeliveryOptionOverride = (payload) => {
  const { id, ...restPayload } = payload;
  return PUT(`/product-api-v2/delivery-option-overrides/${id}`, restPayload);
};

export const fetchDeliveryOptionOverride = (payload) => {
  return GET(`/product-api-v2/delivery-option-overrides?productId=${payload}`);
};



// EXISTING

/**
 * fetch product list
 * @param {*} payload
 */
export async function fetchProductList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/product-api-v2/admin/products?${params}`);
}

/**
 * get product by id
 * @param {*} payload
 */

export async function fetchProductById(payload) {
  return GET(`/product-api-v2/admin/product/${payload}`);
}


/**
 * update product by id
 * @param {*} payload
 */
export async function updateProductById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/admin/product/${id}`, rest);
}

/**
 * create or update product
 * @param {*} payload
 */
 export async function createUpdateProduct(payload) {
  return PUT(`/product-api-v2/admin`, payload);
}

/**
 * batch update product by id
 * @param {*} payload
 */
export async function batchUpdateProductById(payload) {
  return PUT('/products/admin/products', payload);
}

/**
 * remove product by id
 * @param {*} payload
 */
export async function removeProductById(payload) {
  return DELETE(`/product-api-v2/admin/${payload}`);
}

/**
 * batch remove product by id
 * @param {*} payload
 */
export async function batchRemoveProductById(payload) {
  return DELETE(`/product-api-v2/admin?ids=${payload}`);
}

/**
 * clone product by id
 * @param {*} payload
 */
export async function cloneProductById(payload) {
  return POST(`/product-api-v2/admin/clone`, payload);
}

/**
 * duplicate variant
 * @param {*} payload
 */
export async function cloneVariant({ productId, variantId }) {
  return POST(`/product-api-v2/admin/products/${productId}/variants?sourceId=${variantId}`);
}

/**
 * delete variant
 * @param {*} payload
 */
export async function deleteVariant({ productId, variantId }) {
  return DELETE(`/product-api-v2/admin/products/${productId}/variants/${variantId}`);
}

/**
 * create product
 * @param {*} payload
 */
export async function createProduct(payload) {
  return POST(`/product-api-v2/admin`, payload);
}


/**
 * fetch product labels
 * @param {*} payload
 */
export async function fetchProductLabels(payload) {
  return GET(`/product-api-v2/admin/labels?${methods.convertQueryString(payload)}`);
}

/**
 * delete product labels
 * @param {*} payload
 */
export async function deleteProductLabels(payload) {
  return DELETE(`/product-api-v2/admin/labels?ids=${payload}`);
}

/**
 * create product labels
 * @param {*} payload
 */
export async function createProductLabel(payload) {
  return POST(`/product-api-v2/admin/labels`, payload);
}

/**
 * get product label detail
 * @param {*} payload
 */

export async function fetchProductLabelDetail(payload) {
  return GET(`/product-api-v2/admin/labels/${payload}`);
}

/**
 * update product labels
 * @param {*} payload
 */
export async function updateProductLabel(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/admin/labels/${id}`, rest);
}

/**
 * fetch category list
 */
export async function fetchCategoryList() {
  return GET('/categories?level=1');
}

/**
 * fetch showroom list
 */
export async function fetchShowroomList(payload) {
  return GET(`/product-api-v2/admin/showrooms?${methods.convertQueryString(payload)}`);
}

/**
 * update showroom by id
 * @param {*} payload
 */
export async function updateShowroomById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/admin/showrooms/${id}`, rest);
}

/**
 * remove showroom by id
 * @param {*} payload
 */
export async function removeShowroomById(payload) {
  return DELETE(`/product-api-v2/admin/showrooms/${payload}`);
}

/**
 * batch update showroom by id
 * @param {*} payload
 */
export async function batchUpdateShowroomById(payload) {
  return PUT('/products/showrooms', payload);
}

/**
 * batch remove showroom by id
 * @param {*} payload
 */
export async function batchRemoveShowroomById(payload) {
  return DELETE(`/product-api-v2/admin/showrooms?ids=${payload}`);
}

/*
 * fetch merchant list
 * @param {*} payload
 */
export async function fetchMerchantList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/merchants?${params}`);
}

/**
 * fetch multiple product by ids
 * @param {*} payload
 */
export async function fetchMultipleProduct(payload) {
  return GET(`/product-api-v2/admin/products?productIds=${payload}`);
}

/**
 * fetch multiple product by ids
 * @param {*} payload
 */
export async function fetchFeaturedCategories(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/categories?${params}`);
}

/**
 * get category
 * @param {*} payload
 */

export async function fetchCategoryById(payload) {
  return GET(`/categories/${payload}`);
}

/**
 * briefs productids
 * @param {*} payload
 */
export async function fetchProductBriefsByProductId(payload) {
  return GET(`/product-api-v2/admin/product-briefs?${methods.convertQueryString(payload)}`);
}

/**
 * upload excel
 * @param {*} payload
 */
export async function uploadExcel(params) {
  const { data } = params;
  const obj = new FormData();
  obj.append('file', data);
  const payload = { data: obj };
  return PUT_FORM_DATA(`/product-api-v2/admin/product-uploads`, payload);
}

/**
 * export
 * @param {*} payload
 */

export async function productExport(payload) {
  // return GET(`/product-api-v2/admin/product-downloads?${methods.convertQueryString(payload)}`);
  // return axios(`/product-api-v2/admin/product-downloads?${methods.convertQueryString(payload)}`, {
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
