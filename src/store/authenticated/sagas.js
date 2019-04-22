import { fork } from 'redux-saga/effects';
import getAuthenticatedUserSaga from './sagas/getAuthenticatedUserSaga';

export default function* root() {
  yield fork(getAuthenticatedUserSaga);
}
