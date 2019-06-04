/**
* Book Actions
*/
import { createAction } from 'redux-actions';
import { 
  GET_BOOKS_TO_HOME_ASYNC, 
  PUT_BOOKS_IDS_MORE_SEEN, 
  PUT_BOOKS_IDS_BY_CATEGORIES, 
  PUT_BOOKS_IDS_BY_LAST_SEARCH,
  OPEN_BOOK_MODAL,
  CLOSE_BOOK_MODAL,
  CANCEL_GET_BOOKS_TO_HOME_ASYNC,
  GET_BOOK_BY_ID_ASYNC,
  GET_BOOKS_ASYNC,
  RESET_BOOK_ID
} from './book/types';

export const getBookByIdPending = createAction(GET_BOOK_BY_ID_ASYNC.PENDING);
export const getBookByIdError = createAction(GET_BOOK_BY_ID_ASYNC.ERROR);
export const getBookByIdSuccess = createAction(GET_BOOK_BY_ID_ASYNC.SUCCESS);
export const getBooksToHomePending = createAction(GET_BOOKS_TO_HOME_ASYNC.PENDING);
export const getBooksToHomeError = createAction(GET_BOOKS_TO_HOME_ASYNC.ERROR);
export const getBooksToHomeSuccess = createAction(GET_BOOKS_TO_HOME_ASYNC.SUCCESS);
export const getBooksSuccess = createAction(GET_BOOKS_ASYNC.SUCCESS);
export const getBooksPending = createAction(GET_BOOKS_ASYNC.PENDING);
export const getBooksError = createAction(GET_BOOKS_ASYNC.ERROR);
export const putBooksMoreSeend = createAction(PUT_BOOKS_IDS_MORE_SEEN);
export const putBooksByCategories = createAction(PUT_BOOKS_IDS_BY_CATEGORIES);
export const putBooksByLastSearch = createAction(PUT_BOOKS_IDS_BY_LAST_SEARCH);
export const openBookModal = createAction(OPEN_BOOK_MODAL);
export const closeBookModal = createAction(CLOSE_BOOK_MODAL);
export const cancelGetBooksToHomeAsync = createAction(CANCEL_GET_BOOKS_TO_HOME_ASYNC);
export const resetBookId = createAction(RESET_BOOK_ID);
