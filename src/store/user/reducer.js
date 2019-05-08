import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { STORE_USER_ASYNC, STORE_USER_RESET } from './types';
import { createResolver } from '@/store/utils';

const storeResolver =  createResolver('store');

const initialState = fromJS({
  store: {
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
  [STORE_USER_RESET]: (state, { payload }) => storeResolver.reset(state, payload),
}, initialState);

export default reducer;
