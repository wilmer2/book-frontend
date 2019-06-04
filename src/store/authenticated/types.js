import { createAsyncTypes } from '@/store/utils';

export const GET_AUTHENTICATED_USER_ASYNC = createAsyncTypes('GET_AUTHENTICATED_USER');
export const GET_OAUTH_USER_START = 'GET_OAUTH_USER_START';
export const GET_OAUTH_USER_END = 'GET_OAUTH_USER_END';
