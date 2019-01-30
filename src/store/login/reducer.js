/*
* Login Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { LOGIN_USER_ASYNC, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from './types';

const initialState = fromJS({
  isFetching: false,
  fetchError: false,
  errorMessage: '',
  openModal: false,
});

const reducer = typeToReducer({
  [LOGIN_USER_ASYNC]: {
    PENDING: state => state.merge({
      isFetching: true,
      fetchError: false,
    }),

    ERROR: (state, { payload: { errors } }) => state.merge({
      isFetching: false,
      fetchError: true,
      errorMessage: errors,
    }),

    SUCCESS: state => state.merge({
      isFetching: false,
      fetchError: false,
    }),
  },
  [OPEN_LOGIN_MODAL]: (state) => state.set('openModal', true),
  [CLOSE_LOGIN_MODAL]: (state) => state.set('openModal', false),
}, initialState);

export default reducer;
