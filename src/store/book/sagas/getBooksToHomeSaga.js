import { take, call, put, all, fork, cancel } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import isEmpty from 'lodash/isEmpty';
import { 
  GET_BOOKS_TO_HOME_ASYNC, 
  CANCEL_GET_BOOKS_TO_HOME_ASYNC 
} from '@/store/book/types';

import { 
  getBooksToHomeSuccess, 
  getBooksToHomeError, 
  putBooksMoreSeend,
  putBooksByCategories,
  putBooksByLastSearch
} from '@/store/Book';

function* getBooksToHome({ categoriesIds, lastSearch }) {
  try {
    const [booksMoreSeen, booksByCategories] = yield all([
      call(BookApi.getBooksToHome, { include: 'user' }),
      call(BookApi.getBooksToHome, { categories_ids: categoriesIds, include: 'user' })
    ]);

    if (!isEmpty(lastSearch)) {
      const booksByLastSearch = yield call(BookApi.getBooksToHome, { searchName: lastSearch, include: 'user' });

      yield put(putBooksByLastSearch(booksByLastSearch));
    }

    yield put(putBooksMoreSeend(booksMoreSeen));
    yield put(putBooksByCategories(booksByCategories));

    yield put(getBooksToHomeSuccess());
  } catch(e) {
    yield put(getBooksToHomeError());
  }
}

export default function* watchGetBooksHome() {
  while(true) {
    const { payload } = yield take(GET_BOOKS_TO_HOME_ASYNC.PENDING);
    const getBooksToHomeTask =  yield fork(getBooksToHome, payload);

    yield take(CANCEL_GET_BOOKS_TO_HOME_ASYNC);
    yield cancel(getBooksToHomeTask);
  }
}
 