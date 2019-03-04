import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_CATEGORIES_ASYNC } from '../types';
import BookApi from '../../../utils/BookApi';
import { getCategoriesSuccess, getCategoriesError } from '../../Category';

function* getCategories() {
  try {
    const categories = yield call(BookApi.getCategories);
    yield put(getCategoriesSuccess(categories));
  } catch(e) {
    yield put(getCategoriesError());
  }
}


export default function* watchGetCategories() {
  yield  takeLatest(GET_CATEGORIES_ASYNC.PENDING, getCategories);
}
