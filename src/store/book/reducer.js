import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { createResolver } from '@/store/utils';

import { 
  GET_BOOKS_TO_HOME_ASYNC,
  PUT_BOOKS_IDS_MORE_SEEN, 
  PUT_BOOKS_IDS_BY_CATEGORIES, 
  PUT_BOOKS_IDS_BY_LAST_SEARCH,
  OPEN_BOOK_MODAL,
  CLOSE_BOOK_MODAL
} from './types';

const homeDataResolver = createResolver('homeData');

const initialState = fromJS({
  byUser: {
    isFetching: false,
    fetched: false,
    fetchError: false,
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
  [GET_BOOKS_TO_HOME_ASYNC.SUCCESS]: state => homeDataResolver.success(state),
  [GET_BOOKS_TO_HOME_ASYNC.PENDING]: state => homeDataResolver.pending(state), 
  [GET_BOOKS_TO_HOME_ASYNC.ERROR]: state => homeDataResolver.error(state),
  [PUT_BOOKS_IDS_MORE_SEEN]: (state, { payload: { ids } }) => 
    state.setIn(['homeData', 'booksIdsMoreSeen'], ids),
  [PUT_BOOKS_IDS_BY_CATEGORIES]: (state, { payload: { ids } }) => 
    state.setIn(['homeData', 'booksIdsByCategories'], ids),
  [PUT_BOOKS_IDS_BY_LAST_SEARCH]: (state, { payload: { ids } }) => 
    state.setIn(['homeData', 'booksIdsByLastSearch'], ids),
  [OPEN_BOOK_MODAL]: (state, { payload: { bookId } }) => state.withMutations(mutator => {
    mutator.setIn(['homeData', 'bookIdModal'], bookId);
    mutator.setIn(['homeData', 'openModal'], true);
  }),
  [CLOSE_BOOK_MODAL]: state => state.setIn(['homeData', 'openModal'], false),
}, initialState);

export default reducer;
