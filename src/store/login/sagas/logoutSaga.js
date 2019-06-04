import { takeEvery, call } from 'redux-saga/effects';
import { LOGOUT } from '@/store/login/types';
import BookApi from '@/utils/BookApi';

function* logout() {
  yield call(BookApi.clearToken);
}

export default function* logoutWatcher() {
  yield takeEvery(LOGOUT, logout);
}
