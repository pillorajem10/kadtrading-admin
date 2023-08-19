
import * as types from '../types';

const initialState = {
  calculationForm: {},
  calculation: {},
  dataList: [],
  calculationDetails: undefined,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_CALCULATION:
      return { ...state, calculation: action.payload };
    case types.HCHAIR_SET_CALCULATION_FORM:
      return { ...state, calculationForm: action.payload };
    case types.HCHAIR_UPDATE_CALCULATION_FORM:
      return { ...state, calculationForm: { ...state.calculationForm, ...action.payload } };

    case types.HCHAIR_SET_CALCULATION_LIST:
      return { ...state, dataList: action.payload };
    case types.HCHAIR_SET_CALCULATION_DETAILS:
      return { ...state, calculationDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;
