import { fork } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
import logoutSaga from './sagas/logoutSaga';
import refreshTokenSaga from './sagas/refreshTokenSaga';
import socialAuthSaga from './sagas/socialAuthSaga';

export default function* root() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(refreshTokenSaga);
  yield fork(socialAuthSaga);
}
