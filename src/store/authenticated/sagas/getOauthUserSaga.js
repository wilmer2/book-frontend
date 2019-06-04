import { call, take, put } from 'redux-saga/effects';
import { GET_OAUTH_USER_START } from '@/store/authenticated/types';
import { 
  getOauthUserEnd, 
  getAuthenticatedUserSuccess 
} from '@/store/Authenticated';

import BookApi from '@/utils/BookApi';


function* getOauthUser(payload) {
  try {
    const authenticadUser = yield call(BookApi.socialAuth, payload);
    yield put(getAuthenticatedUserSuccess(authenticadUser));
    yield put(getOauthUserEnd());

  } catch (error) {
    yield call(BookApi.clearToken);
    yield put(getOauthUserEnd());
  }
}

export default function* watchGetOauthUser() {
    while (true) {
      const { payload } = yield take(GET_OAUTH_USER_START);

      yield call(getOauthUser, payload);
    }
}
