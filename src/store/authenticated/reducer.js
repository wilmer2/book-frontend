import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable'; 
import { GET_AUTHENTICATED_USER_ASYNC } from './types';
import { createResolver } from '@/store/utils';

const authenticatedResolver = createResolver();

const initialState = fromJS({
  isFetching: false,
  fetched: false,
  fetchError: false,
  id: null,
});

const reducer = typeToReducer({
  [GET_AUTHENTICATED_USER_ASYNC.SUCCESS]: (state, { payload }) => 
    authenticatedResolver.success(state, payload), 
  [GET_AUTHENTICATED_USER_ASYNC.PENDING]: state => authenticatedResolver.pending(state),
  [GET_AUTHENTICATED_USER_ASYNC.ERROR]: state => authenticatedResolver.error(state),
}, initialState);

export default reducer;
