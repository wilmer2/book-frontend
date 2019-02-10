import { takeLatest, call, put } from 'redux-saga/effects';
import BookApi from '../../utils/BookApi';
import { GET_AUTHENTICATED_USER_ASYNC } from './types';
import { 
  getAuthenticatedUserSuccess,  
  getAuthenticatedUserError 
} from '../Authenticated';

function* getAuthenticatedUser() {
  try {
    const authenticatedUser = yield call(BookApi.getAuthenticatedUser);
    yield put(getAuthenticatedUserSuccess(authenticatedUser));
  } catch(error) {
    yield put(getAuthenticatedUserError());
  }
}

export default function* watchGetUserPending() {
  yield takeLatest(GET_AUTHENTICATED_USER_ASYNC.PENDING, getAuthenticatedUser);
}
