import * as types from '../types';

const initialState = {
  inhouseForm: {},
  inhouse: {},

  dataList: [],
  inhouseDetails: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_INHOUSE:
      return { ...state, inhouse: action.payload };
    case types.HCHAIR_SET_INHOUSE_FORM:
      return { ...state, inhouseForm: action.payload };
    case types.HCHAIR_UPDATE_INHOUSE_FORM:
      return { ...state, inhouseForm: { ...state.inhouseForm, ...action.payload } };

    case types.HCHAIR_SET_INHOUSE_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_SET_INHOUSE_DETAILS:
      return { ...state, inhouseDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;
