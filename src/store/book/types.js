/**
* Book Types
*/
import  { createAsyncTypes } from '../Utilities';

export const GET_BOOKS_BY_USER_ASYNC = createAsyncTypes('GET_BOOKS_BY_USER');
export const GET_BOOKS_TO_HOME_ASYNC = createAsyncTypes('GET_BOOKS_TO_HOME'); 
export const PUT_BOOKS_TO_STATE = createAsyncTypes('PUT_BOOKS');
