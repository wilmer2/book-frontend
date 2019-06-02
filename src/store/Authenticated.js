/**
* Authenticated Actions
*/
import { createAction } from 'redux-actions';
import { 
  GET_AUTHENTICATED_USER_ASYNC,
  GET_OAUTH_USER_START,
  GET_OAUTH_USER_END 
} from '@/store/authenticated/types';

export const getAuthenticatedUserPending = createAction(GET_AUTHENTICATED_USER_ASYNC.PENDING);
export const getAuthenticatedUserSuccess = createAction(GET_AUTHENTICATED_USER_ASYNC.SUCCESS);
export const getAuthenticatedUserError = createAction(GET_AUTHENTICATED_USER_ASYNC.ERROR);
export const getOauthUserEnd = createAction(GET_OAUTH_USER_END);
export const getOauthUserStart = createAction(GET_OAUTH_USER_START);
