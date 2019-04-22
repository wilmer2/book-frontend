import typeToReducer from 'type-to-reducer';
import { MERGER_ENTITIES } from './types';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: {},
  categories: {},
  readinglists: {},
  books: {},
  pages: {},
});

const reducer =  typeToReducer({
  [MERGER_ENTITIES]: (state, { payload }) => state.mergeDeep(fromJS(payload)), 
}, initialState);

export default reducer;
