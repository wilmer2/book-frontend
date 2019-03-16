import { fork } from 'redux-saga/effects';
import { getBooksToHomeSaga } from './sagas';

export default function* rootSaga() {
  yield fork(getBooksToHomeSaga);
}
