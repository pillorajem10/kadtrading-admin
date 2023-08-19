import * as types from '../types';

const initialState = {
  product: {},
  productForm: {
    merchantId: '',
    status: 'UNPUBLISHED',
    featured: false,
    width: 0,
    height: 0,
    depth: 0,
    priceRange: false,
  },
  dataList: [],
  productDetails: undefined,
  deliveryOptions: undefined,
  merchantDeliveryOptions: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_PRODUCT:
      return { ...state, product: action.payload };
    case types.HCHAIR_SET_PRODUCT_FORM:
      return { ...state, productForm: action.payload };

    case types.HCHAIR_UPDATE_PRODUCT_FORM:
      return { ...state, productForm: { ...state.productForm, ...action.payload } };
    case types.HCHAIR_SET_PRODUCT_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_SET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };

    case types.HCHAIR_SET_PRODUCT_DELIVERY_OPTION_OVERRIDE:
      return { ...state, deliveryOptions: action.payload };
    case types.HCHAIR_SET_MERCHANT_DELIVERY_OPTION:
      return { ...state, merchantDeliveryOptions: action.payload };
    case types.HCHAIR_ADD_NEW_DELIVERY_OPTION_OVERRIDE:
      return { ...state, deliveryOptions: [...(state.deliveryOptions ?? []), action.payload] };
    case types.HCHAIR_RESET_PRODUCT_STATE:
      return { ...initialState };
    case types.HCHAIR_RESET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: undefined,
        deliveryOptions: undefined,
        merchantDeliveryOptions: undefined,
      };

    default:
      return state;
  }
};

export default reducer;
