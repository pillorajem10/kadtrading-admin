// types
import * as types from '../types';

/**
 *
 * @param {TableParam} payload
 * TableParam = { key: string, filter: any, pageIndex: number, pageSize: 10, }
 */
export const addTable = (newTablePayload) => {
  return {
    type: types.ADD_TABLE,
    payload: newTablePayload,
  };
};

export const updatePagination = (payload) => ({ type: types.UPDATE_TABLE_PAGINATION, payload });

export const removeTable = (tableKey) => ({
  type: types.REMOVE_TABLE,
  payload: tableKey,
});

export const cacheTableFilter = (payload) => ({
  type: types.CACHE_TABLE_FILTER_VALUES,
  payload,
});
