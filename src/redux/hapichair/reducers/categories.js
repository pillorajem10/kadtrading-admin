import * as types from '../types';

const initialState = {
  categoryForm: {},
  allCategories: {},
  expandedCategoryId: [],
  filter: {
    panel: '',
  },
  levelOneCategories: [],
  levelThreeCategories: [],
  selectedParentCategoryId: null,
  selectedCategory: null,
  rootCategoryId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HCHAIR_SET_ROOT_CATEGORY_ID:
      return { ...state, rootCategoryId: action.payload };
    case types.HCHAIR_SET_EXPANDED_CATEGORY:
      return { ...state, expandedCategoryId: action.payload };
    case types.HCHAIR_UPDATE_CATEGORY_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case types.HCHAIR_SET_LEVEL_ONE_CATEGORY:
      return { ...state, levelOneCategories: action.payload };
    case types.HCHAIR_SET_LEVEL_THREE_CATEGORY:
      return { ...state, levelThreeCategories: action.payload };
    case types.HCHAIR_SET_SELECTED_PARENT_CATEGORY_ID:
      return { ...state, selectedParentCategoryId: action.payload };
    case types.HCHAIR_SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case types.HCHAIR_RESET_CATEGORY_STATE:
      return { ...initialState, expandedCategoryId: state.expandedCategoryId  };
    default:
      return state;
  }
};

export default reducer;
