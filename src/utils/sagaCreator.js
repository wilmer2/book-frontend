import { take, call, put, select } from 'redux-saga/effects';
import merge from 'lodash/merge';

const makeGetPage = (entityName, keyPagination, page) => state => keyPagination ? 
  state.ui[entityName].hasIn(['pagination', keyPagination, page]) :
  state.ui[entityName].hasIn(['pagination', page]);

export const createPaginationSaga = (
  requestActionType,
  pedingAction, 
  successAction, 
  errorAction,
  apiFunc, 
  entityName
) => {
  function* getPages(payload) {
    try {
      const { keyPagination, page } = payload;
      const hasPage = yield select(makeGetPage(entityName, keyPagination, page));

      if (hasPage) return;

      yield put(pedingAction());

      const pages = yield call(apiFunc, payload);
      const data = merge(pages, { keyPagination });

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

      if (hasEntity) {
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
