import { takeLatest, call, put } from 'redux-saga/effects';
import BookApi from '@/utils/BookApi';
import { GET_AUTHENTICATED_USER_ASYNC } from '@/store/authenticated/types';
import { 
  getAuthenticatedUserSuccess,  
  getAuthenticatedUserError 
} from '@/store/Authenticated';

function* getAuthenticatedUser() {
  try {
    const params = { include: 'preferences' };

    const authenticatedUser = yield call(BookApi.getAuthenticatedUser, params);
    yield put(getAuthenticatedUserSuccess(authenticatedUser));
  } catch(error) {
    yield put(getAuthenticatedUserError());
  }
}

export default function* watchGetUserPending() {
  yield takeLatest(GET_AUTHENTICATED_USER_ASYNC.PENDING, getAuthenticatedUser);
}
