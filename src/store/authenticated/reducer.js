import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable'; 
import { 
  GET_AUTHENTICATED_USER_ASYNC, 
  GET_OAUTH_USER_START, 
  GET_OAUTH_USER_END 
} from './types';

import { createResolver } from '@/store/utils';

const authenticatedResolver = createResolver();

const initialState = fromJS({
  isFetching: false,
  fetched: false,
  fetchError: false,
  id: null,
  isFetchingOauth: false,
});

const reducer = typeToReducer({
  [GET_AUTHENTICATED_USER_ASYNC.SUCCESS]: (state, { payload }) => {
    return authenticatedResolver.successById(state, payload); 
  },
  [GET_AUTHENTICATED_USER_ASYNC.PENDING]: state => authenticatedResolver.pending(state),
  [GET_AUTHENTICATED_USER_ASYNC.ERROR]: state => authenticatedResolver.error(state),
  [GET_OAUTH_USER_START]: state => state.set('isFetchingOauth', true),
  [GET_OAUTH_USER_END]: state => state.set('isFetchingOauth', false),
}, initialState);

export default reducer;
