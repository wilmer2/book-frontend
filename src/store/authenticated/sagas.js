import { fork } from 'redux-saga/effects';
import getAuthenticatedUserSaga from './getAuthenticatedUserSaga';

export default function* root() {
  yield fork(getAuthenticatedUserSaga);
}
