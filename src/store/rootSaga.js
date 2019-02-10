import { all } from 'redux-saga/effects';
import login from './login/sagas';
import authenticated from './authenticated/sagas';

export default function* rootSaga() {
  yield all([
    login(),
    authenticated(),
  ]);
}
