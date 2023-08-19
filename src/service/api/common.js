import { POST, POST_FORM_DATA } from '../request';

/**
 * renew image url
 * @param {*} payload
 */
export async function renewImageUrl(payload) {
  return POST(`/common-api/files/copy?url=${payload}`);
}

/**
 * upload image
 * @param {*} payload
 */
export async function saveImage(params) {
  const { container, data, prefix } = params;
  const obj = new FormData();
  obj.append('file', data);
  const payload = { data: obj };
  return POST_FORM_DATA(`/common-api/files?container=${container}&prefix=${prefix}&h=256`, payload);
}
