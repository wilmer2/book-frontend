/**
* Login Actions
*/
import { createAction } from 'redux-actions';
import { 
  LOGIN_USER_ASYNC, 
  OPEN_LOGIN_MODAL, 
  CLOSE_LOGIN_MODAL,
  REFRESH_TOKEN_ASYNC,
  LOGOUT
} from './login/types';

export const loginPending = createAction(
  LOGIN_USER_ASYNC.PENDING, 
  ({ values }) => values,
  ({ actions }) => actions
);

export const loginError = createAction(LOGIN_USER_ASYNC.ERROR);
export const loginSuccess = createAction(LOGIN_USER_ASYNC.SUCCESS);

export const refreshTokenSuccess = createAction(REFRESH_TOKEN_ASYNC.SUCCESS);
export const refreshTokenPending = createAction(REFRESH_TOKEN_ASYNC.PENDING);
export const refreshTokenError = createAction(REFRESH_TOKEN_ASYNC.ERROR);

export const openLoginModal = createAction(OPEN_LOGIN_MODAL);
export const closeLoginModal = createAction(CLOSE_LOGIN_MODAL);
export const logout = createAction(LOGOUT);
