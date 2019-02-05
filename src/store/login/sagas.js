import { fork, call, take, put, cancelled, cancel } from 'redux-saga/effects';
import _ from 'lodash';
import { LOGIN_USER_ASYNC, LOGOUT } from './types';
import { loginError, loginSuccess, closeLoginModal} from '../Login';
import BookApi from '../../utils/BookApi';

function* sendCredentials(payload) {
  try {
    const token = yield call(BookApi.login, payload);

    yield put(loginSuccess());
    yield put(closeLoginModal());
    yield call(BookApi.storeToken, token);
    
  } catch(error) {
    yield put(loginError(error));
  } finally {
    if (yield cancelled()) {
      // Action returns to original values
      yield put(loginSuccess);
    }
  }
}

export default function* loginFlow() {
  while(true) {
    const { payload } = yield take(LOGIN_USER_ASYNC.PENDING);

    const task = yield fork(sendCredentials, payload);
    const action = yield take([LOGOUT, LOGIN_USER_ASYNC.ERROR]);

    if (_.isEqual(action.type, LOGOUT)) {
      yield cancel(task);
    }

    yield call(BookApi.clearToken);
  }
}
