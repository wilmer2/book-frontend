import { take, call, put, all, fork, cancel } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

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
    const params = { include: 'user '};

    const [booksMoreSeen, booksByCategories] = yield all([
      call(BookApi.getBooksToHome, params),
      call(BookApi.getBooksToHome, merge(params, { categoriesIds }))
    ]);

    if (!isEmpty(lastSearch)) {
      const booksByLastSearch = yield call(BookApi.getBooksToHome, merge(params, { searchName: lastSearch }));

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
 