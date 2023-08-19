// utils
import * as methods from '@utils/methods';

import { DELETE, GET, POST, PUT } from '../request';

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
  return GET(`/product-api-v2/admin/products/${payload}`);
}

/**
 * create product with variants field
 * @param {*} payload
 */
export async function createProduct(payload) {
  return POST(`/product-api-v2/admin`, payload);
}

/**
 * update product by id
 * @param {*} payload
 */
export async function updateProductById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/products/${id}`, rest);
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
  return DELETE(`/product-api-v2/products/${payload}`);
}

/**
 * batch remove product by id
 * @param {*} payload
 */
export async function batchRemoveProductById(payload) {
  return DELETE(`/product-api-v2/admin/products?ids=${payload}`);
}

/**
 * clone product by id
 * @param {*} payload
 */
export async function cloneProductById(payload) {
  return POST(`/product-api-v2/products?sourceId=${payload}`);
}

/**
 * clone product by id
 * @param {*} payload
 */
export async function fetchProductBriefsByMerchantId(payload) {
  return GET(`/product-api-v2/admin/product-briefs?${methods.convertQueryString(payload)}`);
}

/**
 * fetch product labels
 * @param {*} payload
 */
export async function fetchProductLabels(payload) {
  return GET(`/product-api-v2/labels?${methods.convertQueryString(payload)}`);
}

/**
 * delete product labels
 * @param {*} payload
 */
export async function deleteProductLabels(payload) {
  return DELETE(`/product-api-v2/labels?ids=${payload}`);
}

/**
 * create product labels
 * @param {*} payload
 */
export async function createProductLabel(payload) {
  return POST(`/product-api-v2/labels`, payload);
}

/**
 * get product label detail
 * @param {*} payload
 */

export async function fetchProductLabelDetail(payload) {
  return GET(`/product-api-v2/labels/${payload}`);
}

/**
 * update product labels
 * @param {*} payload
 */
export async function updateProductLabel(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/labels/${id}`, rest);
}

/**
 * fetch category list
 */
export async function fetchCategoryList() {
  return GET('/categories?level=1');
}

/**
 * fetch category list by params
 * @param {*} payload
 */
export async function fetchCategoryListByParams(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/categories?${params}`);
}

/**
 * fetch showroom list
 */
export async function fetchShowroomList(payload) {
  return GET(`/product-api-v2/showrooms?${methods.convertQueryString(payload)}`);
}

/**
 * update showroom by id
 * @param {*} payload
 */
export async function fetchShowroomById(payload) {
  const { id } = payload;
  return GET(`/product-api-v2/showrooms/${id}`);
}

/**
 * update showroom by id
 * @param {*} payload
 */
export async function updateShowroomById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/product-api-v2/showrooms/${id}`, rest);
}

/**
 * remove showroom by id
 * @param {*} payload
 */
export async function removeShowroomById(payload) {
  return DELETE(`/product-api-v2/showrooms/${payload}`);
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
  return DELETE(`/product-api-v2/showrooms?ids=${payload}`);
}

/**
 * batch remove showroom by id
 * @param {*} payload
 */
export async function createOrUpdateShowroom(payload) {
  return PUT(`/product-api-v2/showrooms`, payload);
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
  return GET(`/product-api-v2/admin/products?${methods.convertQueryString(payload)}`);
}

/**
 * fetch multiple category by ids
 * @param {*} payload
 */
export async function fetchMultipleCategory(payload) {
  return GET(`/categories?${methods.convertQueryString(payload)}`);
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
  return PUT(`/product-api-v2/products`, payload);
};

export const createOrUpdateProductOptions = (payload) => {
  return PUT(`/product-api-v2/product-options`, payload);
};

export const batchDeleteProductOptions = (payload) => {
  return DELETE(`/product-api-v2/product-options?ids=${payload}`);
};

export const fetchProductRecommendation = (productId) => {
  return GET(`/product-api-v2/products/${productId}/recommendations`);
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

export const deleteDeliveryOptionOverride = (id) => {
  return DELETE(`/product-api-v2/delivery-option-overrides/${id}`);
};
