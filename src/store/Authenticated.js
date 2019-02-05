/**
* Authenticated Actions
*/
import { createAction } from 'redux-actions';
import { GET_AUTHENTICATED_USER_ASYNC } from './authenticated/types';

export const getAuthenticatedUserPending = createAction(GET_AUTHENTICATED_USER_ASYNC.PENDING);
export const getAuthenticatedUserSuccess = createAction(GET_AUTHENTICATED_USER_ASYNC.SUCCESS);
export const getAuthenticatedUserError = createAction(GET_AUTHENTICATED_USER_ASYNC.ERROR);
