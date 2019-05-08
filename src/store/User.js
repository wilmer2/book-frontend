/**
* User Actions
*/
import { createAction } from 'redux-actions';
import { STORE_USER_ASYNC, STORE_USER_RESET } from './user/types';

export const storeUserPending = createAction(
  STORE_USER_ASYNC.PENDING, 
  ({ values }) => values,
  ({ actions }) => actions
);

export const storeUserError = createAction(STORE_USER_ASYNC.ERROR);
export const storeUserSuccess = createAction(STORE_USER_ASYNC.SUCCESS);
export const storeUserReset = createAction(STORE_USER_RESET);
