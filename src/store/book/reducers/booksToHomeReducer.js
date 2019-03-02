/**
* Object for reducer home
*/
import { 
  GET_BOOKS_TO_HOME_ASYNC,
  PUT_BOOKS_IDS_MORE_SEEN, 
  PUT_BOOKS_IDS_BY_CATEGORIES, 
  PUT_BOOKS_IDS_BY_LAST_SEARCH 
} from '../types';

const booksToHomeReducer = {
  [GET_BOOKS_TO_HOME_ASYNC.PENDING]: state => state.mergeDeep({
    homeData: {
      isFetching: true,
      fetched: false,
    },
  }),
  [GET_BOOKS_TO_HOME_ASYNC.ERROR]: state => state.mergeDeep({
    homeData: {
      isFetching: false,
      fetchError: true,
    },
  }),
  [GET_BOOKS_TO_HOME_ASYNC.SUCCESS]: state => state.mergeDeep({
    homeData: {
      fetchError: false,
      isFetching: false,
      fetched: true,
    },
  }),
  [PUT_BOOKS_IDS_MORE_SEEN]: (state, { payaload: { idsList } }) => state.merge({
    booksIdsMoreSeen: idsList,
  }),
  [PUT_BOOKS_IDS_BY_CATEGORIES]: (state, { payaload: { idsList } }) => state.merge({
    booksIdsByCategories: idsList,
  }),
  [PUT_BOOKS_IDS_BY_LAST_SEARCH]: (state, { payaload: { idsList } }) => state.merge({
    booksIdsByLastSearch: idsList,
  }),
};

export default booksToHomeReducer;
