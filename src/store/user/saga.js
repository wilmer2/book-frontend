import { fork } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import { storeDataSaga } from '@/store/sagaCreator';
import { STORE_USER_ASYNC, EDIT_USER_ASYNC } from './types';
import { 
  storeUserSuccess, 
  storeUserError, 
  editUserSuccess, 
  editUserError 
} from '@/store/User';


const storeUser = storeDataSaga(
  STORE_USER_ASYNC.PENDING,
  storeUserSuccess, 
  storeUserError,
  BookApi.storeUser
);

const editUser = storeDataSaga(
  EDIT_USER_ASYNC.PENDING,
  editUserSuccess,
  editUserError,
  BookApi.editUser
);

export default function* rootSaga() {
  yield fork(storeUser);
  yield fork(editUser);
}
