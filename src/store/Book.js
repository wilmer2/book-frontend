/**
* Book Actions
*/
import { createAction } from 'redux-actions';
import { GET_BOOKS_TO_HOME_ASYNC, PUT_BOOKS_TO_STATE } from './book/types';

export const getBooksToHomePending = createAction(GET_BOOKS_TO_HOME_ASYNC.PENDING);
export const getBooksToHomeError = createAction(GET_BOOKS_TO_HOME_ASYNC.ERROR);
export const getBooksToHomeSuccess = createAction(GET_BOOKS_TO_HOME_ASYNC.SUCCESS);
export const putBooksToState = createAction(PUT_BOOKS_TO_STATE);
