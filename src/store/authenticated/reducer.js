/**
* Authenticated Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable'; 
import { GET_AUTHENTICATED_USER_ASYNC } from './types';

const initialState = fromJS({
  authenticated: {
    isFetching: true,
    fetched: false,
    fetchError: false,
    errorMessage: '',
  },
});

const reducer = typeToReducer({
  [GET_AUTHENTICATED_USER_ASYNC]: {
    PENDING: state => state.mergeIn(['authenticated'], {
      fetched: false,
      isFetching: true,
      fetchError: false,
    }),
    ERROR: (state, { payload: { errors } }) => state.mergeIn(['authenticated'], {
      fetched: false,
      isFetching: false,
      fetchError: true,
      errorMessage: errors,

    }),
    SUCCESS: state => state.mergeIn(['authenticated'], {
      fetched: true,
      isFetching: false,
      fetchError: false,
    }),
  }
}, initialState);

export default reducer;
