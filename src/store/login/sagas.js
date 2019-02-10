import { fork } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';

export default function* root() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
}
