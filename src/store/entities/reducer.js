/**
* Entities Reducer
*/
import typeToReducer from 'type-to-reducer';
import { MERGER_ENTITIES } from './types';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: {},
  categories: {},
  readinglists: {},
  books: {},
});

const reducer =  typeToReducer({
  [MERGER_ENTITIES]: (state, action) => state.mergeDeep(fromJS(action.payload)), 
}, initialState);

export default reducer;
