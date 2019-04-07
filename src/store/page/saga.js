import { fork } from 'redux-saga/effects';
import BookApi from '../../utils/BookApi';
import { createPaginationSaga, createSearchEntityByIdSaga } from '../../utils/sagaCreator';
import { REQUEST_PAGINATION_OF_PAGES, GET_PAGE_BY_ID_ASYNC } from './types';
import { 
  getPagesSuccess, 
  getPagesError, 
  getPagesPending ,
  getPageByIdSuccess, 
  getPageByIdError 
} from '../Page';

const ENTITY_NAME = 'page';

const getPagesSaga = createPaginationSaga(
  REQUEST_PAGINATION_OF_PAGES,
  getPagesPending,
  getPagesSuccess, 
  getPagesError,
  BookApi.getPages,
  ENTITY_NAME
);

const getPageByIdSaga = createSearchEntityByIdSaga(
  GET_PAGE_BY_ID_ASYNC.PENDING,
  getPageByIdSuccess,
  getPageByIdError,
  BookApi.getPageById,
  ENTITY_NAME
);

export default function* rootSaga() {
  yield fork(getPagesSaga);
  yield fork(getPageByIdSaga);
}
