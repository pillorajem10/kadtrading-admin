import * as types from '../types';
import { tabs } from '../../../modules/hapichair/orders/utils';

const initialState = {
  dataList: [],
  productList: [],
  orderDetail: null,
  headerTabIndex: tabs[0].key,
  filter: {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
    status: '',
  },
  pagination: {
    pageIndex: 1,
    pageSize: 10,
    totalItem: undefined,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_ORDER_DETAIL:
      return { ...state, orderDetail: action.payload };
    /*
    case types.HCHAIR_UPDATE_ORDER_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };
    */
    case types.HCHAIR_UPDATE_HEADER_TAB_INDEX:
      return { ...state, headerTabIndex: action.payload };

    case types.HCHAIR_UPDATE_ORDER_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case types.HCHAIR_SET_ORDER_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_UPDATE_ORDER_LIST_PAGINATION:
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case types.HCHAIR_SET_ORDER_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case types.HCHAIR_SET_ORDER_DETAILS:
      return { ...state, orderDetail: action.payload };
    case types.HCHAIR_RESET_ORDER_STATE:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
