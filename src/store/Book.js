/**
* Book Actions
*/
import { createAction } from 'redux-actions';
import { 
  GET_BOOKS_TO_HOME_ASYNC, 
  PUT_BOOKS_IDS_MORE_SEEN, 
  PUT_BOOKS_IDS_BY_CATEGORIES , 
  PUT_BOOKS_IDS_BY_LAST_SEARCH 
} from './book/types';

export const getBooksToHomePending = createAction(GET_BOOKS_TO_HOME_ASYNC.PENDING);
export const getBooksToHomeError = createAction(GET_BOOKS_TO_HOME_ASYNC.ERROR);
export const getBooksToHomeSuccess = createAction(GET_BOOKS_TO_HOME_ASYNC.SUCCESS);
export const putBooksMoreSeend = createAction(PUT_BOOKS_IDS_MORE_SEEN);
export const putBooksByCategories = createAction(PUT_BOOKS_IDS_BY_CATEGORIES);
export const putBooksByLastSearch = createAction(PUT_BOOKS_IDS_BY_LAST_SEARCH);
