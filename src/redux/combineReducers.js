import { combineReducers } from 'redux';

import common from './common/reducers';
import form from './common/reducers/form';
import hchair from './hapichair/reducers';
import ui from './common/reducers/ui';

const reducers = combineReducers({
  common,
  form,
  hchair,
  ui,
});

export default reducers;
