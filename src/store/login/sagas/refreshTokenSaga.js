import { call, take, put } from 'redux-saga/effects';
import { REFRESH_TOKEN_ASYNC } from '@/store/login/types';
import { refreshTokenSuccess, refreshTokenError } from '@/store/Login';
import BookApi from '@/utils/BookApi';


function* sendRefreshToken(payload) {
  try {
    const token = yield call(BookApi.refreshToken, payload);

    const { accessToken, refreshToken } = token;

    yield call(BookApi.storeToken, accessToken, refreshToken);
    yield put(refreshTokenSuccess());

  } catch (error) {
    yield call(BookApi.clearToken);
    yield put(refreshTokenError());
  }
}

export default function* watchRefreshToken() {
    while (true) {
      const { payload } = yield take(REFRESH_TOKEN_ASYNC.PENDING);

      yield call(sendRefreshToken, payload);
    }
}
