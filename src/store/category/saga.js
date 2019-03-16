import { fork } from 'redux-saga/effects';
import getCategoriesSaga from './sagas/getCategoriesSaga';

export default function* rootSaga() {
  yield fork(getCategoriesSaga);
}
