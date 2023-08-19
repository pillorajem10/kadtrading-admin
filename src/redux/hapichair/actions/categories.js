// antd
import { message } from 'antd';

// constants
import HCHAIR_CATEGORY_STATUS from '@constants/category-status';

import { common } from '@redux/combineActions';

import {
  fetchRootCategory,
  fetchCategoryList,
  fetchCategoryById,
  updateCategoryById,
  removeCategoryById,
  createCategory,
  batchUpdateCategoryById,
  batchRemoveCategoryById,
  updateCategoryByParam,
} from '@service/api/category2b';

import * as types from '../types';

export const getRootCategory = (payload) => async(dispatch) => {
  const res = await fetchRootCategory(payload);
  const { success, data } = res;
  if (success) {
    const { _id } = data.docs[0];

    dispatch({
      type: types.HCHAIR_SET_ROOT_CATEGORY_ID,
      payload: _id,
    });
  }
  return res;
};

export const getCategoryList = (payload) => async () => {
  const res = await fetchCategoryList(payload);
  return res;
};

export const getCategoryById = (payload) => async () => {
  const res = await fetchCategoryById(payload);
  return res;
};

export const getLevelOneCategory = () => async (dispatch) => {
  const payload = {
    status: HCHAIR_CATEGORY_STATUS.ALL,
    level: 1,
    pageIndex: 1,
    pageSize: 1000,
  };
  await dispatch(common.ui.setLoading());
  const res = await fetchCategoryList(payload);
  await dispatch(common.ui.clearLoading());

  const { success, data } = res;

  if (success) {
    dispatch({
      type: types.HCHAIR_SET_LEVEL_ONE_CATEGORY,
      payload: data.docs,
    });
  }
  return res;
};

export const setLevelThreeCategory = (payload) => ({
  type: types.HCHAIR_SET_LEVEL_THREE_CATEGORY,
  payload,
});

export const getLevelThreeCategory = (parentCategoryId) => async (dispatch) => {
  const payload = {
    status: HCHAIR_CATEGORY_STATUS.ALL,
    pageIndex: 1,
    pageSize: 1000,
    parentId: parentCategoryId,
  };

  await dispatch(common.ui.setLoading());
  const res = await fetchCategoryList(payload);
  await dispatch(common.ui.clearLoading());

  const { success, data } = res;

  if (success) {
    dispatch(setLevelThreeCategory(data.docs));
  }
  return res;
};

export const getCategoryByParam = (payload) => async (dispatch) => {
  const res = await fetchCategoryList(payload);
  const { success, data } = res;

  if (success) {
    dispatch({
      type: types.HCHAIR_SET_LEVEL_ONE_CATEGORY,
      payload: data.docs,
    });
  }
  return res;
};

export const removeCategory = (payload) => async (dispatch, getState) => {
  const res = await removeCategoryById(payload);

  const { success } = res;

  if (success) {
    message.success('Category deleted successfully!');

    const { hchair } = getState();
    const { levelThreeCategories } = hchair.categories;

    if (levelThreeCategories.length > 0) {
      const { parentId } = levelThreeCategories[0];
      dispatch(getLevelThreeCategory(parentId));
    } else {
      dispatch(getLevelOneCategory());
    }
  }
  return res;
};

export const setSelectedParentCategoryId = (parentId) => ({
  type: types.HCHAIR_SET_SELECTED_PARENT_CATEGORY_ID,
  payload: parentId,
});

export const setSelectedCategory = (payload) => ({
  type: types.HCHAIR_SET_SELECTED_CATEGORY,
  payload,
});

export const updateCategoryByParameters = (payload) => async (dispatch) => {
  const res = await updateCategoryByParam(payload);
  const { success } = res;

  if (success) {
    dispatch(setSelectedParentCategoryId(null));
    dispatch(setSelectedCategory(null));
    dispatch(getLevelOneCategory());
  }
  return res;
};

export const updateSubCategory = (payload) => async (dispatch) => {
  const res = await updateCategoryByParam(payload);
  const { success } = res;

  if (success) {
    dispatch(getLevelThreeCategory(payload.id));
  }
  return res;
};

export const updateCategoryDetails = (payload) => async (dispatch, getState) => {
  const res = await updateCategoryById(payload);
  const { success } = res;

  if (success) {
    message.success('Category updated successfully!');

    const { hchair } = getState();
    const { levelThreeCategories } = hchair.categories;

    if (levelThreeCategories.length > 0) {
      const { parentId } = levelThreeCategories[0];
      dispatch(getLevelThreeCategory(parentId));
    } else {
      dispatch(getLevelOneCategory());
    }
  }

  return res;
};

export const updateCategory = (categoryId, payload) => async () => {
  const res = await updateCategoryById({ id: categoryId, ...payload });
  return res;
};

export const updateOrCreateCategory = (payload) => async () => {
  const res = await updateCategoryByParam(payload);
  return res;
};

export const updateCategoryFilter = (filter) => ({
  type: types.HCHAIR_UPDATE_CATEGORY_FILTER,
  payload: filter,
});

export const reset = () => ({ type: types.HCHAIR_RESET_CATEGORY_STATE });


export const addCategory = (payload) => async () => {
  const res = await createCategory(payload);
  return res;
};

export const batchUpdateCategory = (payload) => async () => {
  const res = await batchUpdateCategoryById(payload);
  return res;
};

export const batchRemoveCategory = (payload) => async () => {
  const res = await batchRemoveCategoryById(payload);
  return res;
};

export const setExpandedCategory = (categoryIds) => ({
  type: types.HCHAIR_SET_EXPANDED_CATEGORY,
  payload: categoryIds,
});

export const setCategory = (categoryForm) => ({
  type: types.HCHAIR_SET_CATEGORY,
  payload: categoryForm,
});

export const updateCategoryForm = (categoryForm) => ({
  type: types.HCHAIR_UPDATE_CATEGORY_FORM,
  payload: categoryForm,
});
