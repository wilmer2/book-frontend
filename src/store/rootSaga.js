import { all } from 'redux-saga/effects';
import login from './login/sagas';
import authenticated from './authenticated/sagas';
import book from './book/rootSaga';
import category from './category/rootSaga';


export default function* rootSaga() {
  yield all([
    login(),
    authenticated(),
    book(),
    category(),
  ]);
}
