import  { createAsyncTypes } from '@/store/utils';

export const GET_BOOK_BY_ID_ASYNC = createAsyncTypes('GET_BOOK_BY_ID');
export const GET_BOOKS_ASYNC = createAsyncTypes('GET_BOOKS_ASYNC');
export const GET_BOOKS_TO_HOME_ASYNC = createAsyncTypes('GET_BOOKS_TO_HOME'); 
export const PUT_BOOKS_IDS_MORE_SEEN = 'PUT_BOOKS_IDS_MORE_SEEN';
export const PUT_BOOKS_IDS_BY_CATEGORIES = 'PUT_BOOKS_IDS_BY_CATEGORIES';
export const PUT_BOOKS_IDS_BY_LAST_SEARCH = 'PUT_BOOKS_IDS_BY_LAST_SEARCH';
export const OPEN_BOOK_MODAL = 'OPEN_BOOK_MODAL';
export const CLOSE_BOOK_MODAL = 'CLOSE_BOOK_MODAL';
export const CANCEL_GET_BOOKS_TO_HOME_ASYNC = 'CANCEL_GET_BOOKS_TO_HOME_ASYNC';
export const RESET_BOOK_ID = 'RESET_BOOK_ID';
