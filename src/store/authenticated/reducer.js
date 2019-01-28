/**
* Authenticated Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable'; 
import { GET_AUTHENTICATED_USER_ASYNC } from './types';

const initialState = fromJS({
  isFetching: true,
  fetched: false,
  fetchError: false,
  errorMessage: '',
});

const reducer = typeToReducer({
  [GET_AUTHENTICATED_USER_ASYNC]: {
    PENDING: state => state.merge({
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    ERROR: (state, { payload: { errors } }) => state.merge({
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: errors,

    }),
    SUCCESS: state => state.merge({
      fetched: true,
      isFetching: false,
      fetchError: false,
    }),
  },
}, initialState);

export default reducer;
