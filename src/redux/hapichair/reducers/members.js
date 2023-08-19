
import * as types from '../types';

const initialState = {
  memberForm: {},
  productRates: [],
  productRate: undefined,
  member: {},
  dataList: [],
  memberDetails: undefined,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_PRODUCT_RATES:
      return { ...state, productRates: action.payload };
    case types.HCHAIR_SET_PRODUCT_RATE:
      return { ...state, productRate: action.payload };
    case types.HCHAIR_SET_PRODUCT_RATE_STATES:
      return { ...state, productRates: action.payload.productRates, productRate: action.payload.productRate };
    case types.HCHAIR_SET_MEMBER:
      return { ...state, member: action.payload };
    case types.HCHAIR_SET_MEMBER_FORM:
      return { ...state, memberForm: action.payload };
    case types.HCHAIR_UPDATE_MEMBER_FORM:
      return { ...state, memberForm: { ...state.memberForm, ...action.payload } };

    case types.HCHAIR_SET_MEMBER_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_SET_MEMBER_DETAILS:
      return { ...state, memberDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;

/*
import * as types from '../types';

const initialState = {
  memberForm: {},
  member: {},

  dataList: [],
  memberDetails: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_MEMBER:
      return { ...state, member: action.payload };
    case types.HCHAIR_SET_MEMBER_FORM:
      return { ...state, memberForm: action.payload };
    case types.HCHAIR_UPDATE_MEMBER_FORM:
      return { ...state, memberForm: { ...state.memberForm, ...action.payload } };

    case types.HCHAIR_SET_MEMBER_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_SET_MEMBER_DETAILS:
      return { ...state, memberDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;
*/
