/**
* Login Actions
*/
import { createAction } from 'redux-actions';
import { 
  LOGIN_USER_ASYNC, 
  OPEN_LOGIN_MODAL, 
  CLOSE_LOGIN_MODAL,
  LOGOUT
} from './login/types';

export const loginPending = createAction(LOGIN_USER_ASYNC.PENDING);
export const loginError = createAction(LOGIN_USER_ASYNC.ERROR);
export const loginSuccess = createAction(LOGIN_USER_ASYNC.SUCCESS);
export const openLoginModal = createAction(OPEN_LOGIN_MODAL);
export const closeLoginModal = createAction(CLOSE_LOGIN_MODAL);
export const logout = createAction(LOGOUT);
