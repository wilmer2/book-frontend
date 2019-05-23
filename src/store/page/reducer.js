import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import { 
  GET_PAGE_BY_ID_ASYNC, 
  GET_PAGES_ASYNC, 
  RESET_PAGES_PAGINATION
} from './types';

import { createResolver, resetPagination } from '@/store/utils';

const resolverById = createResolver('byId');
const pageResolver = createResolver();
const infinityPagination = true;

const initialState = fromJS({
  isFetching: true,
  fetched: false,
  fetchError: false,
  pagination: {
    totalPages: 1,
    currentPage: 1,
    ids: [],
  },
  byId: {
    fetched: false, 
    fetchError: false,
    isFetching: true,
    id: null,
  },
});

const reducer = typeToReducer({
  [GET_PAGE_BY_ID_ASYNC.SUCCESS]: (state, { payload }) => 
    resolverById.successById(state, payload),
  [GET_PAGE_BY_ID_ASYNC.PENDING]: state => resolverById.pending(state),
  [GET_PAGE_BY_ID_ASYNC.ERROR]: (state, { payload }) => resolverById.error(state, payload),
  [GET_PAGES_ASYNC.SUCCESS]: (state, { payload }) => 
    pageResolver.success(state, payload, infinityPagination),
  [GET_PAGES_ASYNC.PENDING]: state => pageResolver.pending(state),
  [GET_PAGES_ASYNC.ERROR]: (state, { payload }) => pageResolver.error(state, payload),
  [RESET_PAGES_PAGINATION]: state => resetPagination(state),
}, initialState);

export default reducer;
