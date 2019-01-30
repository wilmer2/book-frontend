import { combineReducers } from 'redux';
import entities from './entities/reducer';
import authenticated from './authenticated/reducer';
import login from './login/reducer';



const rootReducer = combineReducers({
  entities,
  ui: combineReducers({
    authenticated,
    login,
  }), 
});

export default rootReducer;
