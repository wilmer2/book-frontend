/**
* Page Actions
*/
import { createAction } from 'redux-actions';
import { 
  GET_PAGES_ASYNC, 
  GET_PAGE_BY_ID_ASYNC, 
  REQUEST_PAGINATION_OF_PAGES 
} from './page/types';

export const getPagesSuccess = createAction(GET_PAGES_ASYNC.SUCCESS);
export const getPagesError = createAction(GET_PAGES_ASYNC.ERROR);
export const getPagesPending = createAction(GET_PAGES_ASYNC.PENDING);
export const getPageByIdSuccess = createAction(GET_PAGE_BY_ID_ASYNC.SUCCESS);
export const getPageByIdError = createAction(GET_PAGE_BY_ID_ASYNC.ERROR);
export const getPageByIdPending = createAction(GET_PAGE_BY_ID_ASYNC.PENDING);
export const requestPaginationPages = createAction(REQUEST_PAGINATION_OF_PAGES);
