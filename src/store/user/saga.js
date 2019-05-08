import { fork } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import { storeDataSaga } from '@/store/sagaCreator';
import { storeUserSuccess, storeUserError } from '@/store/User';
import { STORE_USER_ASYNC } from './types';

const ENTITY_NAME = 'user';

const storeUser = storeDataSaga(
  STORE_USER_ASYNC.PENDING,
  storeUserSuccess, 
  storeUserError,
  BookApi.storeUser,
  ENTITY_NAME
);

export default function* rootSaga() {
  yield fork(storeUser);
}
