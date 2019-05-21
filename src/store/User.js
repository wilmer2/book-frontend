/**
* User Actions
*/
import { createAction } from 'redux-actions';
import { 
  STORE_USER_ASYNC, 
  EDIT_USER_ASYNC, 
  RESET_STORE_USER, 
  RESET_EDIT_USER 
} from './user/types';

export const storeUserPending = createAction(
  STORE_USER_ASYNC.PENDING, 
  ({ values }) => values,
  ({ actions }) => actions
);

export const storeUserError = createAction(STORE_USER_ASYNC.ERROR);
export const storeUserSuccess = createAction(STORE_USER_ASYNC.SUCCESS);
export const resetStoreUser = createAction(RESET_STORE_USER);

export const editUserPending = createAction(
  EDIT_USER_ASYNC.PENDING, 
  ({ values }) => values,
  ({ actions }) => actions
);

export const editUserError = createAction(EDIT_USER_ASYNC.ERROR);
export const editUserSuccess = createAction(EDIT_USER_ASYNC.SUCCESS);
export const resetEditUser = createAction(RESET_EDIT_USER);
