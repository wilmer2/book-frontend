import { fork } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import { createPaginationSaga, createSearchEntityByIdSaga } from '@/store/sagaCreator';
import { GET_PAGES_ASYNC, GET_PAGE_BY_ID_ASYNC } from './types';
import { 
  getPagesSuccess, 
  getPagesError, 
  getPageByIdSuccess, 
  getPageByIdError 
} from '@/store/Page';

const ENTITY_NAME = 'pages';

const getPagesSaga = createPaginationSaga(
  GET_PAGES_ASYNC.PENDING,
  getPagesSuccess, 
  getPagesError,
  BookApi.getPages
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
