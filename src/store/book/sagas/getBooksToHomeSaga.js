import { take, call, put, all } from 'redux-saga/effects';
import BookApi from '../../../utils/BookApi';
import isEmpty from 'lodash/isEmpty';
import { GET_BOOKS_TO_HOME_ASYNC } from '../types';
import { getBooksToHomeSuccess, getBooksToHomeError, putBooksToState } from '../../Book';

function* getBooksToHome({ categoriesId, lastSearch }) {
  try {
    const [booksMoreSeen, booksByCategories] = yield all([
      call(BookApi.getBooksToHome),
      call(BookApi.getBooksToHome, { categories_id: categoriesId })
    ]);

    if (!isEmpty(lastSearch)) {
     const booksByLastSearch = yield call(BookApi.getBooksToHome, { searchName: lastSearch });

      yield put(putBooksToState(booksByLastSearch));
    }

    yield put(putBooksToState(booksMoreSeen));
    yield put(putBooksToState(booksByCategories));

    yield put(getBooksToHomeSuccess());
  } catch(e) {
    yield put(getBooksToHomeError());
  }
}

export default function* watchGetBooksHome() {
  while(true) {
    const { payload } = yield take(GET_BOOKS_TO_HOME_ASYNC.PENDING);

    yield call(getBooksToHome, payload);
  }
}
 