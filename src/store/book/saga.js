import { fork } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import getBooksToHomeSaga from './sagas/getBooksToHomeSaga';
import { createSearchEntityByIdSaga } from '@/store/sagaCreator';
import { GET_BOOK_BY_ID_ASYNC } from './types';

import { 
  getBookByIdSuccess, 
  getBookByIdError
} from '@/store/Book';

const ENTITY_NAME = 'book';

const getBookByIdSaga = createSearchEntityByIdSaga(
  GET_BOOK_BY_ID_ASYNC.PENDING,
  getBookByIdSuccess,
  getBookByIdError,
  BookApi.getBookById,
  ENTITY_NAME
);

export default function* rootSaga() {
  yield fork(getBooksToHomeSaga);
  yield fork(getBookByIdSaga);
}
