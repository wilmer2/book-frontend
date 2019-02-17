/**
* Category Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS, List } from 'immutable';
import { GET_CATEGORIES_ASYNC } from './types';

const initialState = fromJS({
  isFetching: false,
  fetched: false,
  fetchError: false,
});

const reducer = typeToReducer({
  [GET_CATEGORIES_ASYNC.PENDING]: state => state.merge({
    isFetching: true,
    fetched: false,
  }),
  [GET_CATEGORIES_ASYNC.ERROR]: state => state.merge({
    fetchError: true,
    isFetching: false,
  }),
  [GET_CATEGORIES_ASYNC.SUCCESS]: state => state.merger({
    fetched: true,
    fetchError: false,
    isFetching: false,
  }), 
}, initialState);

export default reducer;
