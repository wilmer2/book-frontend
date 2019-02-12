/**
* Book Reducer
*/
import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { booksToHomeReducer } from './reducers';


const initialState = fromJS({
  byUser: {
    isFetching: false,
    fetched: false,
    fetchError: false,
  },

  homeData: {
    isFetching: false,
    fetched: false,
    fetchError: false,
  },
});

const reducer = typeToReducer({
  ...booksToHomeReducer,
}, initialState);

export default reducer;
