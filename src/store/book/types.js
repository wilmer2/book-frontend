/**
* Book Types
*/
import  { createAsyncTypes } from '../Utilities';

export const GET_BOOKS_BY_USER_ASYNC = createAsyncTypes('GET_BOOKS_BY_USER');
export const GET_BOOKS_TO_HOME_ASYNC = createAsyncTypes('GET_BOOKS_TO_HOME'); 
export const PUT_BOOKS_IDS_MORE_SEEN = 'PUT_BOOKS_IDS_MORE_SEEN';
export const PUT_BOOKS_IDS_BY_CATEGORIES = 'PUT_BOOKS_IDS_BY_CATEGORIES';
export const PUT_BOOKS_IDS_BY_LAST_SEARCH = 'PUT_BOOKS_IDS_BY_LAST_SEARCH';
