import * as types from '../types';

const initialState = {
  merchantForm: {},
  merchant: {},

  dataList: [],
  merchantDetails: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_MERCHANT:
      return { ...state, merchant: action.payload };
    case types.HCHAIR_SET_MERCHANT_FORM:
      return { ...state, merchantForm: action.payload };
    case types.HCHAIR_UPDATE_MERCHANT_FORM:
      return { ...state, merchantForm: { ...state.merchantForm, ...action.payload } };

    case types.HCHAIR_SET_MERCHANT_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_SET_MERCHANT_DETAILS:
      return { ...state, merchantDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;
