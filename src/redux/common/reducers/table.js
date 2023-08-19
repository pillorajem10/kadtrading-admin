import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TABLE: {
      const { key } = action.payload;
      return {
        ...state,
        [key]: {
          ...action.payload,
        },
      };
    }
    case types.REMOVE_TABLE:
      return { ...state, [action.payload]: undefined };
    case types.CACHE_TABLE_FILTER_VALUES: {
      const { key, ...restPayload } = action.payload;
      return { ...state, [key]: { ...state[key], filterValues: { ...restPayload } } };
    }
    case types.UPDATE_TABLE_PAGINATION: {
      const { key, ...restPayload } = action.payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          pagination: { ...state[key].pagination, ...restPayload },
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
