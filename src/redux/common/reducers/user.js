import * as types from '../types';

const initialState = {
  authenticated: false,
  account: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTHENTICATED:
      return { ...state, authenticated: true };

    case types.SET_UNAUTHENTICATED:
      return initialState;

    case types.SET_USER_DETAILS:
      return {
        ...state,
        authenticated: true,
        account: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
