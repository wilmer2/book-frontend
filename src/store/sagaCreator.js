import { take, call, put, select } from 'redux-saga/effects';

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

    } catch(e) {
      yield put(errorAction());
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
      
    } catch(e) {
      yield put(errorAction());
    }
  }

  return function* watchEntitiyById() {
    while(true) {
      const { payload } = yield take(requestActionType);

      yield call(getEntityById, payload);
    }
  }
}
