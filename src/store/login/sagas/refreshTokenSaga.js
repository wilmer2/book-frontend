import { call, take, put } from 'redux-saga/effects';
import { REFRESH_TOKEN_START } from '@/store/login/types';
import { refreshTokenEnd } from '@/store/Login';
import { getAuthenticatedUserPending } from '@/store/Authenticated';
import BookApi from '@/utils/BookApi';


function* sendRefreshToken(payload) {
  try {
    const token = yield call(BookApi.refreshToken, payload);

    const { accessToken, refreshToken } = token;

    yield call(BookApi.storeToken, accessToken, refreshToken);
    yield put(refreshTokenEnd());
    yield put(getAuthenticatedUserPending());

  } catch (error) {
    yield call(BookApi.clearToken);
    yield put(refreshTokenEnd());
  }
}

export default function* watchRefreshToken() {
    while (true) {
      const { payload } = yield take(REFRESH_TOKEN_START);

      yield call(sendRefreshToken, payload);
    }
}
