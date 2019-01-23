import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapse: true,
    stateTransformer: state => state.toJS(),
  });

  middlewares = [...middlewares, logger];
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
