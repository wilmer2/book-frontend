/**
* Object for reducer home
*/
import { GET_BOOKS_TO_HOME_ASYNC } from '../types';

const booksToHomeReducer = {
  [GET_BOOKS_TO_HOME_ASYNC.PENDING]: state => state.mergeDeep({
    homeData: {
      isFetching: true,
      fetched: false,
    },
  }),
  [GET_BOOKS_TO_HOME_ASYNC.ERROR]: state => state.mergeDeep({
    homeData: {
      fetchError: true,
      isFetching: false,
    },
  }),
  [GET_BOOKS_TO_HOME_ASYNC.SUCCESS]: state => state.mergeDeep({
    homeData: {
      fetchError: false,
      isFetching: false,
      fetched: true,
    },
  }),
};

export default booksToHomeReducer;
