import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { GET_CATEGORIES_ASYNC, PUT_CATEGORIES_IDS } from './types';
import { createResolver } from '@/store/utils';

const categoryResolver = createResolver();

const initialState = fromJS({
  isFetching: true,
  fetched: false,
  fetchError: false,
  ids: [],
});

const reducer = typeToReducer({
  [GET_CATEGORIES_ASYNC.SUCCESS]: (state, { payload }) => categoryResolver.success(state, payload),
  [GET_CATEGORIES_ASYNC.PENDING]: state => categoryResolver.pending(state),
  [GET_CATEGORIES_ASYNC.ERROR]: state => categoryResolver.error(state),
  [PUT_CATEGORIES_IDS]: (state, { payload: { ids } }) => state.set('ids', ids),
}, initialState);

export default reducer;
