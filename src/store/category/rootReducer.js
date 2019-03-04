/**
* Category Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { GET_CATEGORIES_ASYNC } from './types';

const initialState = fromJS({
  isFetching: false,
  fetched: false,
  fetchError: false,
  idsList: null,
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
  [GET_CATEGORIES_ASYNC.SUCCESS]: (state, { payload: { idsList }}) => state.merge({
    fetched: true,
    fetchError: false,
    isFetching: false,
    idsList,
  }), 
}, initialState);

export default reducer;
