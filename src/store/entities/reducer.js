import typeToReducer from 'type-to-reducer';
import { MERGER_ENTITIES } from './types';
import { fromJS } from 'immutable';
import mergeDeepOverwriteLists from '@/store/mergeDeepOverwriteLists';

const initialState = fromJS({
  authenticated: {},
  categories: {},
  readinglists: {},
  books: {},
  pages: {},
});

const reducer =  typeToReducer({
  [MERGER_ENTITIES]: (state, { payload }) => mergeDeepOverwriteLists(state, fromJS(payload)),
}, initialState);

export default reducer;
