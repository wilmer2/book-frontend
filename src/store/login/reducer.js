import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { 
  LOGIN_USER_ASYNC, 
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_END,  
  OPEN_LOGIN_MODAL, 
  CLOSE_LOGIN_MODAL,
  SOCIAL_AUTH_ASYNC
} from './types';

import { createResolver } from '@/store/utils';

const loginResolver = createResolver();
const socialAuthResolver = createResolver('socialAuth');

const initialState = fromJS({
  fetched: false,
  isFetching: false,
  fetchError: false,
  errorMessage: '',
  openModal: false,
  isRefreshToken: false,

  socialAuth: {
    fetched: false,
    isFetching: false,
    fetchError: false,
    errorMessage: '',
  },
});

const reducer = typeToReducer({
  [LOGIN_USER_ASYNC.SUCCESS]: state => loginResolver.success(state),
  [LOGIN_USER_ASYNC.PENDING]: state => loginResolver.pending(state),
  [LOGIN_USER_ASYNC.ERROR]: (state, { payload }) => loginResolver.error(state, payload),
  [REFRESH_TOKEN_START]: state => state.set('isRefreshToken', true),
  [REFRESH_TOKEN_END]: state => state.set('isRefreshToken', false),
  [OPEN_LOGIN_MODAL]: state => state.set('openModal', true),
  [CLOSE_LOGIN_MODAL]: state => state.withMutations((mutator) => {
    mutator.set('openModal', false);
    mutator.set('fetchError', false);
    mutator.setIn(['socialAuth', 'fetchError'], false);
  }),
  [SOCIAL_AUTH_ASYNC.SUCCESS]: state => socialAuthResolver.success(state),
  [SOCIAL_AUTH_ASYNC.PENDING]: state => socialAuthResolver.pending(state),
  [SOCIAL_AUTH_ASYNC.ERROR]: (state, { payload }) => socialAuthResolver.error(state, payload),
}, initialState);

export default reducer;
