import axios from 'axios';

// api
import { login, forgotPassword, updateUserById } from '@service/api/account';

// utils
import { decode } from '@utils/methods';

// types
import * as types from '../types';

export const setUnAuthenticated = () => ({
  type: types.SET_UNAUTHENTICATED,
});

export const setAuthenticated = () => ({
  type: types.SET_AUTHENTICATED,
});

export const setAuthorizationHeader = (token) => {
  const bearerToken = `Bearer ${token}`;
  localStorage.setItem('token', token);
  axios.defaults.headers.common.Authorization = bearerToken;
};

export const setUserDetails = (account) => {
  localStorage.setItem('account', JSON.stringify(account));

  return {
    type: types.SET_USER_DETAILS,
    payload: account,
  };
};

export const userForgotPassword = (payload) => async () => {
  const res = await forgotPassword(payload);
  return res;
};

export const updateUser = (payload) => async () => {
  const res = await updateUserById(payload);
  return res;
};

export const userLogin = (payload) => (dispatch) => {
  login(payload).then((res) => {
    const { success, data } = res;
    if (success) {
      const user = decode(data.token);
      dispatch(setUserDetails(user));
      setAuthorizationHeader(data.token);
      window.location.href = '/';
    }
  });
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('account');
  dispatch(setUnAuthenticated());
  window.location.href = '/logout';
};
