import { all } from 'redux-saga/effects';
import login from './login/sagas';
import authenticated from './authenticated/sagas';
import book from './book/saga';
import category from './category/saga';


export default function* rootSaga() {
  yield all([
    login(),
    authenticated(),
    book(),
    category(),
  ]);
}
