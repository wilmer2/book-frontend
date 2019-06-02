import { fork } from 'redux-saga/effects';
import getAuthenticatedUserSaga from './sagas/getAuthenticatedUserSaga';
import getOauthUserSaga from './sagas/getOauthUserSaga';


export default function* root() {
  yield fork(getAuthenticatedUserSaga);
  yield fork(getOauthUserSaga);
}
