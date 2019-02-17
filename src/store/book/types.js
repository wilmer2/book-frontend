/**
* Book Types
*/
import  { createAsyncTypes } from '../Utilities';

export const GET_BOOKS_BY_USER_ASYNC = createAsyncTypes('GET_BOOKS_BY_USER');
export const GET_BOOKS_TO_HOME_ASYNC = createAsyncTypes('GET_BOOKS_TO_HOME'); 
export const PUT_BOOKS_IDS_MORE_SEEN = createAsyncTypes('PUT_BOOKS_MORE_SEEN');
export const PUT_BOOKS_IDS_BY_CATEGORIES = createAsyncTypes('PUT_BOOKS_BY_CATEGORIES');
export const PUT_BOOKS_IDS_BY_LAST_SEARCH = createAsyncTypes('PUT_BOOKS_BY_LAST_SEARCH');
