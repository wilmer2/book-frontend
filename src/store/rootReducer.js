import { combineReducers } from 'redux';
import entities from './entities/reducer';
import authenticated from './authenticated/reducer';


const rootReducer = combineReducers({
  entities,
  ui: combineReducers({
    authenticated,
  }), 
});

export default rootReducer;
