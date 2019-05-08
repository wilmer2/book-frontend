import { take, call, put, select } from 'redux-saga/effects';
import parseError from '@/utils/parseError';
import isObject from 'lodash/isObject';

export const createPaginationSaga = (
  requestActionType,
  successAction, 
  errorAction,
  apiFunc, 
  entityName
) => {
  function* getPages(payload) {
    try {
      const data = yield call(apiFunc, payload);

      yield put(successAction(data));

    } catch(error) {
      const errorResponse = parseError(error);

      yield put(errorAction(errorResponse));
    }
  }

  return function* watchGetPages() {
    while(true) {
      const { payload } = yield take(requestActionType);

      yield call(getPages, payload); 
    }
  }
}

const makeGetEntitiy = (entityName, id) => state => state.entities.hasIn([entityName, id]);

export const createSearchEntityByIdSaga = (
  requestActionType,
  successAction, 
  errorAction, 
  apiFunc,
  entityName
) => {
  function* getEntityById(payload) {
    try {
      const hasEntity = yield select(makeGetEntitiy(entityName, payload.id));

      if (!hasEntity) {
        const entity = yield call(apiFunc, payload);
        yield put(successAction(entity));
      } else {
        yield put(successAction({ id: payload.id }));
      }
      
    } catch(error) {
      const errorResponse = parseError(error);

      yield put(errorAction(errorResponse));
    }
  }

  return function* watchEntitiyById() {
    while(true) {
      const { payload } = yield take(requestActionType);

      yield call(getEntityById, payload);
    }
  }
}

export const storeDataSaga = (
  requestActionType,
  successAction,
  errorAction,
  apiFunc
) => {
  function* storeData(payload, meta) {
    const { resetForm, setErrors, setSubmitting } = meta;
    
    try {
      const data = yield call(apiFunc, payload);
      yield put(successAction(data));
      yield call(resetForm);

    } catch(error) {
      const errorResponse = parseError(error);

      yield call(setSubmitting, false);

      if (isObject(errorResponse)) {
        yield call(setErrors, errorResponse);
        yield put(errorAction());

        return;
      }
      
      yield put(errorAction({ errors : errorResponse }));
    }
  }

  return function* watchSendData() {
    while(true) {
      const { payload, meta } = yield take(requestActionType);

      yield call(storeData, payload, meta);
    }
  }
}
