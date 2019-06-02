/**
* Login Actions
*/
import { createAction } from 'redux-actions';
import { 
  LOGIN_USER_ASYNC, 
  OPEN_LOGIN_MODAL, 
  CLOSE_LOGIN_MODAL,
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_END,
  LOGOUT,
  SOCIAL_AUTH_ASYNC
} from './login/types';

export const loginPending = createAction(
  LOGIN_USER_ASYNC.PENDING, 
  ({ values }) => values,
  ({ actions }) => actions
);

export const loginError = createAction(LOGIN_USER_ASYNC.ERROR);
export const loginSuccess = createAction(LOGIN_USER_ASYNC.SUCCESS);
export const refreshTokenStart = createAction(REFRESH_TOKEN_START);
export const refreshTokenEnd = createAction(REFRESH_TOKEN_END);
export const openLoginModal = createAction(OPEN_LOGIN_MODAL);
export const closeLoginModal = createAction(CLOSE_LOGIN_MODAL);
export const logout = createAction(LOGOUT);
export const socialAuthPending = createAction(SOCIAL_AUTH_ASYNC.PENDING);
export const socialAuthError = createAction(SOCIAL_AUTH_ASYNC.ERROR);
export const socialAuthSuccess = createAction(SOCIAL_AUTH_ASYNC.SUCCESS);
