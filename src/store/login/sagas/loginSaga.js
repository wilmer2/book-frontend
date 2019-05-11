import { fork, call, take, put, cancelled, cancel } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import { LOGIN_USER_ASYNC, LOGOUT } from '@/store/login/types';
import { loginError, loginSuccess, closeLoginModal } from '@/store/Login';
import { getAuthenticatedUserPending } from '@/store/Authenticated';
import BookApi from '@/utils/BookApi';
import parseError from '@/utils/parseError';

function* sendCredentials(payload, meta) {
  const { resetForm, setErrors, setSubmitting } = meta;

  try {
    const token = yield call(BookApi.login, payload);
    const { accessToken, refreshToken } = token;

    yield put(loginSuccess());
    yield call(BookApi.storeToken, accessToken, refreshToken);
    yield call(resetForm);
    yield put(closeLoginModal());
    yield put(getAuthenticatedUserPending());
    
  } catch(error) {
    const errors = parseError(error);

    yield call(setSubmitting, false);

    if (isObject(errors)) {
      yield call(setErrors, errors);
      yield put(loginError());

      return;
    }
    
    yield put(loginError({ errors }));

  } finally {
    if (yield cancelled()) {
      yield put(loginSuccess);
    }
  }
}

export default function* loginFlow() {
  while(true) {
    const { payload, meta } = yield take(LOGIN_USER_ASYNC.PENDING);

    const task = yield fork(sendCredentials, payload, meta);
    const action = yield take([LOGOUT, LOGIN_USER_ASYNC.ERROR]);

    if (isEqual(action.type, LOGOUT)) {
      yield cancel(task);
    }
  }
}
