// types
import * as types from '../types';

export const addForm = (payload) => ({
  type: types.ADD_FORM,
  payload,
});

export const updateForm = (payload) => ({ type: types.UPDATE_FORM, payload });

export const removeForm = (formName) => ({
  type: types.REMOVE_FORM,
  payload: formName,
});
