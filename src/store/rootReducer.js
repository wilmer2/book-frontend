import { combineReducers } from 'redux';
import entities from './entities/reducer';
import authenticated from './authenticated/reducer';
import login from './login/reducer';
import book from './book/reducer';
import category from './category/reducer';
import page from './page/reducer';

import isEqual from 'lodash/isEqual';
import { LOGOUT } from './login/types';

const appReducer = combineReducers({
  entities,
  ui: combineReducers({
    authenticated,
    login,
    book,
    category,
    page,
  }), 
});

const rootReducer = (state, action) => {
  if (isEqual(action.type, LOGOUT)) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
