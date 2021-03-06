import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { createResolver } from '@/store/utils';

import { 
  GET_BOOK_BY_ID_ASYNC,
  GET_BOOKS_TO_HOME_ASYNC,
  PUT_BOOKS_IDS_MORE_SEEN, 
  PUT_BOOKS_IDS_BY_CATEGORIES, 
  PUT_BOOKS_IDS_BY_LAST_SEARCH,
  OPEN_BOOK_MODAL,
  CLOSE_BOOK_MODAL,
  GET_BOOKS_ASYNC,
  RESET_BOOK_ID
} from './types';

const byIdResolver = createResolver('byId');
const homeDataResolver = createResolver('homeData');
const bookResolver = createResolver();

const initialState = fromJS({
  isFetching: true,
  fetched: false,
  fetchError: false,
  pagination: {
    totalPages: 1,
    currentPage: 1,
    total: 0,
    ids: [],
  },  
  byId: {
    isFetching: false,
    fetched: false,
    fetchError: false,
    id: null,
  },
  homeData: {
    isFetching: true,
    fetched: false,
    fetchError: false,
    lastSearch: '',
    booksIdsMoreSeen: [],
    booksIdsByCategories: [],
    booksIdsByLastSearch: [],
    bookIdModal: null,
    openModal: false,
  },
});

const reducer = typeToReducer({
  [GET_BOOK_BY_ID_ASYNC.SUCCESS]: (state, { payload }) => {
    return byIdResolver.successById(state, payload);
  },
  [GET_BOOK_BY_ID_ASYNC.PENDING]: state => byIdResolver.pending(state),
  [GET_BOOK_BY_ID_ASYNC.ERROR]: (state, { payload }) => byIdResolver.error(state, payload),
  [GET_BOOKS_TO_HOME_ASYNC.SUCCESS]: state => homeDataResolver.success(state),
  [GET_BOOKS_TO_HOME_ASYNC.PENDING]: state => homeDataResolver.pending(state), 
  [GET_BOOKS_TO_HOME_ASYNC.ERROR]: state => homeDataResolver.error(state),
  [PUT_BOOKS_IDS_MORE_SEEN]: (state, { payload: { ids } }) => {
    return state.setIn(['homeData', 'booksIdsMoreSeen'], ids);
  },
  [PUT_BOOKS_IDS_BY_CATEGORIES]: (state, { payload: { ids } }) => {
    return state.setIn(['homeData', 'booksIdsByCategories'], ids);
  },
  [PUT_BOOKS_IDS_BY_LAST_SEARCH]: (state, { payload: { ids } }) => {
    return state.setIn(['homeData', 'booksIdsByLastSearch'], ids);
  },
  [OPEN_BOOK_MODAL]: (state, { payload: { bookId } }) => state.withMutations(mutator => {
    mutator.setIn(['homeData', 'bookIdModal'], bookId);
    mutator.setIn(['homeData', 'openModal'], true);
  }),
  [CLOSE_BOOK_MODAL]: state => state.setIn(['homeData', 'openModal'], false),
  [GET_BOOKS_ASYNC.SUCCESS]: (state, { payload }) => {
    return bookResolver.successPagination(state, payload);
  },
  [GET_BOOKS_ASYNC.PENDING]: state => bookResolver.pending(state),
  [GET_BOOKS_ASYNC.ERROR]: (state, { payload }) => bookResolver.error(state, payload),
  [RESET_BOOK_ID]: state => byIdResolver.resetById(state),
}, initialState);

export default reducer;
