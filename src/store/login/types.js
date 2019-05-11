import { createAsyncTypes } from '@/store/utils';

export const LOGIN_USER_ASYNC = createAsyncTypes('LOGIN_USER');
export const REFRESH_TOKEN_ASYNC = createAsyncTypes('REFRESH_TOKEN');
export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const LOGOUT = 'LOGOUT';
