import { fork } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
import logoutSaga from './sagas/logoutSaga';

export default function* root() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
}
