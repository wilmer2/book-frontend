import {  take, put, call } from 'redux-saga/effects';
import { SOCIAL_AUTH_ASYNC } from '@/store/login/types';
import { getAuthenticatedUserSuccess } from '@/store/Authenticated';
import { 
  socialAuthError, 
  socialAuthSuccess, 
  closeLoginModal 
} from '@/store/Login';

import BookApi from '@/utils/BookApi';
import parseError from '@/utils/parseError';

function* socialAuth(payload) {
  try {
    const authenticadUser = yield call(BookApi.socialAuth, payload);
    const { meta: { custom: { accessToken } } } = authenticadUser;

    yield put(socialAuthSuccess());
    yield put(getAuthenticatedUserSuccess(authenticadUser));
    yield call(BookApi.storeToken, accessToken);
    yield put(closeLoginModal());

  } catch(error) {
    const errors = parseError(error);

    yield put(socialAuthError({ errors }));
    
  }
}

export default function* watchSocialAuth() {
  while(true) {
    const { payload } = yield take(SOCIAL_AUTH_ASYNC.PENDING);

    yield call(socialAuth, payload);
  }
} 
