import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';

const sageMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sageMiddleware),
);

export default store;
