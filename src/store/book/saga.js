import { fork } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import getBooksToHomeSaga from './sagas/getBooksToHomeSaga';
import { createSearchEntityByIdSaga, createPaginationSaga } from '@/store/sagaCreator';
import { GET_BOOK_BY_ID_ASYNC, GET_BOOKS_ASYNC } from './types';

import { 
  getBookByIdSuccess, 
  getBookByIdError,
  getBooksSuccess,
  getBooksError,
} from '@/store/Book';

const ENTITY_NAME = 'books';

const getBookByIdSaga = createSearchEntityByIdSaga(
  GET_BOOK_BY_ID_ASYNC.PENDING,
  getBookByIdSuccess,
  getBookByIdError,
  BookApi.getBookById,
  ENTITY_NAME
);

const getBooksSaga = createPaginationSaga(
  GET_BOOKS_ASYNC.PENDING,
  getBooksSuccess,
  getBooksError,
  BookApi.getBooks,
  ENTITY_NAME
);

export default function* rootSaga() {
  yield fork(getBooksToHomeSaga);
  yield fork(getBookByIdSaga);
  yield fork(getBooksSaga);
}
