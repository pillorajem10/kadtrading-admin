import { combineReducers } from 'redux';

import user from './user';
import table from './table';

const commonReducer = combineReducers({
  user,
  table,
});

export default commonReducer;
