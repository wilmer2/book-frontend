import { combineReducers } from 'redux';
import { reducer as toastrReducer} from 'react-redux-toastr'
import entities from './entities/reducer';
import authenticated from './authenticated/reducer';
import login from './login/reducer';
import book from './book/reducer';
import category from './category/reducer';
import page from './page/reducer';
import user from './user/reducer';


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
    user,
  }), 
  toastr: toastrReducer,
});

const rootReducer = (state, action) => {
  if (isEqual(action.type, LOGOUT)) state = undefined;
  
  return appReducer(state, action);
}

export default rootReducer;
