import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { 
  LOGIN_USER_ASYNC, 
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_END,  
  OPEN_LOGIN_MODAL, 
  CLOSE_LOGIN_MODAL
} from './types';

import { createResolver } from '@/store/utils';

const loginResolver = createResolver();

const initialState = fromJS({
  fetched:false,
  isFetching: false,
  fetchError: false,
  errorMessage: '',
  openModal: false,
  isRefreshToken: false,
});

const reducer = typeToReducer({
  [LOGIN_USER_ASYNC.SUCCESS]: state => loginResolver.success(state),
  [LOGIN_USER_ASYNC.PENDING]: state => loginResolver.pending(state),
  [LOGIN_USER_ASYNC.ERROR]: (state, { payload }) => loginResolver.error(state, payload),
  [REFRESH_TOKEN_START]: state => state.set('isRefreshToken', true),
  [REFRESH_TOKEN_END]: state => state.set('isRefreshToken', false),
  [OPEN_LOGIN_MODAL]: state => state.set('openModal', true),
  [CLOSE_LOGIN_MODAL]: state => state.merge({
    openModal: false,
    fetchError: false,
  }),
}, initialState);

export default reducer;
