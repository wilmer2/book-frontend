import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_CATEGORIES_ASYNC } from '@/store/category/types';
import BookApi from '@/utils/BookApi';
import { getCategoriesSuccess, getCategoriesError, putCategories } from '@/store/Category';

function* getCategories() {
  try {
    const categories = yield call(BookApi.getCategories);

    yield put(putCategories(categories));
    yield put(getCategoriesSuccess());
  } catch(e) {
    yield put(getCategoriesError());
  }
}

export default function* watchGetCategories() {
  yield  takeLatest(GET_CATEGORIES_ASYNC.PENDING, getCategories);
}
