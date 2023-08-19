import { combineReducers } from 'redux';

import categories from './categories';
import members from './members';
import merchants from './merchants';
import products from './products';
import orders from './orders';
import calculations from './calculations';
import inhouse from './inhouse';

const reducer = combineReducers({
  categories,
  members,
  merchants,
  products,
  orders,
  calculations,
  inhouse,
});

export default reducer;
