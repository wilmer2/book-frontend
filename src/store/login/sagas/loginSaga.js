import { fork, call, take, put, cancelled, cancel } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';
import { LOGIN_USER_ASYNC, LOGOUT } from '@/store/login/types';
import { loginError, loginSuccess, closeLoginModal } from '@/store/Login';
import { getAuthenticatedUserPending } from '@/store/Authenticated';
import BookApi from '@/utils/BookApi';
import parseError from '@/utils/parseError';

function* sendCredentials(payload) {
  try {
    const token = yield call(BookApi.login, payload);

    yield put(loginSuccess());
    yield call(BookApi.storeToken, token.access_token);
    yield put(closeLoginModal());
    yield put(getAuthenticatedUserPending());
    
  } catch(error) {
    const errorReponse = parseError(error);
    
    yield put(loginError(errorReponse));
  } finally {
    if (yield cancelled()) {
      //Action returns to original values
      yield put(loginSuccess);
    }
  }
}

export default function* loginFlow() {
  while(true) {
    const { payload } = yield take(LOGIN_USER_ASYNC.PENDING);

    const task = yield fork(sendCredentials, payload);
    const action = yield take([LOGOUT, LOGIN_USER_ASYNC.ERROR]);

    if (isEqual(action.type, LOGOUT)) {
      yield cancel(task);
    }
  }
}
