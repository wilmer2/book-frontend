/**
* Page Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { pagesPaginationReducer, pageByIdReducer }  from './reducers';

const initialState = fromJS({
  isFetching: true,
  fetched: false,
  fetchError: false,
  pagination: {
    totalPages: 1,
    currentPage: 1,
  },
  byId: {
    fetched: false,
    fetchError: false,
    isFetching: true,
    id: null,
  },
});

const reducer = typeToReducer({
  ...pagesPaginationReducer,
  ...pageByIdReducer,
}, initialState);

export default reducer;
