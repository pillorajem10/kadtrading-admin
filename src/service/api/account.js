// utils
import * as methods from '@utils/methods';
import { GET, POST, PUT } from '../request';

/**
 * login
 * @param {*} payload
 */
export async function login(payload) {
  return POST('/account/admin/login', payload);
}

/**
 * update user by id
 * @param {*} payload
 */
export async function updateUserById(payload) {
  const { id, ...rest } = payload;
  return PUT(`/vsers/${id}`, rest);
}

/**
 * fetch member list
 */
export async function fetchMemberList(payload) {
  const params = methods.convertQueryString(payload);
  return GET(`/vsers?${params}`);
}

/**
 * forgot password
 * @param {*} payload
 */
export async function forgotPassword(payload) {
  return POST('/account/forgot-password', payload);
}
