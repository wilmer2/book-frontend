import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import _ from 'lodash';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

const setStateTransformer = (state) => {
  const newState = {};

  _.each(state, (value, key) => {
    if (Immutable.isImmutable(value)) {
      newState[key] = value.toJS();
    } else {
      newState[key] = setStateTransformer(value);
    }
  });

  return newState;
}

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapse: true,
    stateTransformer: state =>  setStateTransformer(state),
  });

  middlewares = [...middlewares, logger];
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
