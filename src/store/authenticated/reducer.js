/**
* Authenticated Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable'; 
import { GET_AUTHENTICATED_USER_ASYNC } from './types';


const initialState = fromJS({
  isFetching: false,
  fetched: false,
  fetchError: false,
  id: null,
});

const reducer = typeToReducer({
  [GET_AUTHENTICATED_USER_ASYNC.PENDING]: state => state.merge({
    fetched: false,
    isFetching: true,
    fetchError: false,
  }),
  [GET_AUTHENTICATED_USER_ASYNC.ERROR]: state => state.merge({
    fetched: false,
    isFetching: false,
    fetchError: true,
  }),
  [GET_AUTHENTICATED_USER_ASYNC.SUCCESS]: (state, { payload: { id } }) => {
    return state.merge({
      fetched: true,
      isFetching: false,
      fetchError: false,
      id,
    });
  }, 
}, initialState);

export default reducer;
