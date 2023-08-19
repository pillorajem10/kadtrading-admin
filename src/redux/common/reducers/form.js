import * as types from '../types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FORM: {
      const { formName, ...restPayload } = action.payload;
      return {
        ...state,
        [formName]: { isDirty: false, isError: false, ...restPayload },
      };
    }
    case types.UPDATE_FORM: {
      const { formName, ...restPayload } = action.payload;
      return { ...state, [formName]: { ...state[formName], ...restPayload } };
    }
    case types.REMOVE_FORM: {
      const formName = action.payload;
      return { ...state, [formName]: undefined };
    }
    default:
      return state;
  }
};

export default reducer;
