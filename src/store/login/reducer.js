import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { LOGIN_USER_ASYNC, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from './types';
import { createResolver } from '@/store/utils';

const loginResolver = createResolver();

const initialState = fromJS({
  isFetching: false,
  fetchError: false,
  errorMessage: '',
  openModal: false,
});

const reducer = typeToReducer({
  [LOGIN_USER_ASYNC.SUCCESS]: state => loginResolver.success(state),
  [LOGIN_USER_ASYNC.PENDING]: state => loginResolver.pending(state),
  [LOGIN_USER_ASYNC.ERROR]: (state, { payload }) => loginResolver.error(state, payload),
  [OPEN_LOGIN_MODAL]: state => state.set('openModal', true),
  [CLOSE_LOGIN_MODAL]: state => state.merge({
    openModal: false,
    fetchError: false,
  }),
}, initialState);

export default reducer;
