import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { STORE_USER_ASYNC, EDIT_USER_ASYNC, RESET_STORE_USER } from './types';
import { createResolver } from '@/store/utils';

const storeResolver = createResolver('store');
const editResolver = createResolver('edit');

const initialState = fromJS({
  store: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
  },

  edit: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    errorMessage: '',
  },
});

const reducer = typeToReducer({
  [STORE_USER_ASYNC.SUCCESS]: (state, { payload }) => storeResolver.success(state, payload),
  [STORE_USER_ASYNC.PENDING]: state => storeResolver.pending(state),
  [STORE_USER_ASYNC.ERROR]: (state, { payload }) => storeResolver.error(state, payload),
  [RESET_STORE_USER]: (state, { payload }) => storeResolver.reset(state, payload),
  [EDIT_USER_ASYNC.SUCCESS]: (state, { payload }) => editResolver.success(state, payload),
  [EDIT_USER_ASYNC.PENDING]: state => editResolver.pending(state),
  [EDIT_USER_ASYNC.ERROR]: (state, { payload }) => editResolver.error(state, payload),
}, initialState);

export default reducer;
