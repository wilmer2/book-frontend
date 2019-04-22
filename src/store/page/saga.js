import { fork } from 'redux-saga/effects';
import BookApi from '../../utils/BookApi';
import { createPaginationSaga, createSearchEntityByIdSaga } from '@/store/sagaCreator';
import { GET_PAGES_ASYNC, GET_PAGE_BY_ID_ASYNC } from './types';
import { 
  getPagesSuccess, 
  getPagesError, 
  getPagesPending ,
  getPageByIdSuccess, 
  getPageByIdError 
} from '@/store/Page';

const ENTITY_NAME = 'page';

const getPagesSaga = createPaginationSaga(
  GET_PAGES_ASYNC.PENDING,
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
