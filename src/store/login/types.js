import { createAsyncTypes } from '@/store/utils';

export const LOGIN_USER_ASYNC = createAsyncTypes('LOGIN_USER');
export const REFRESH_TOKEN_START = 'REFRESH_TOKEN_START';
export const REFRESH_TOKEN_END = 'REFRESH_TOKEN_END';
export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const LOGOUT = 'LOGOUT';
export const SOCIAL_AUTH_ASYNC = createAsyncTypes('SOCIAL_AUTH');
