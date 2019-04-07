/**
* Object for pagination data of page
*/
import { GET_PAGES_ASYNC, REQUEST_PAGINATION_OF_PAGES } from '../types';

const reducer = {
  [GET_PAGES_ASYNC.PENDING]: state => state.merge({
    fetchError: false,
    isFetching: true,
  }),
  [GET_PAGES_ASYNC.ERROR]: (state, { payload: { errors } }) => state.merge({
    isFetching: false,
    fetchError: true,
    errorMessage: errors,
  }),
  [GET_PAGES_ASYNC.SUCCESS]: (state, { payload: {
    idsList, 
    totalPages, 
    currentPage, 
    keyPagination 
  }}) => state.withMutations(mutator => {
      mutator.setIn(['pagination', keyPagination, currentPage], idsList);
      mutator.set('fetched', true);
      mutator.set('isFetching', false);
      mutator.set('fetchError', false);
      mutator.setIn(['pagination', 'totalPages'], totalPages);
      mutator.setIn(['pagination', 'currentPage'], currentPage)
  }),
  [REQUEST_PAGINATION_OF_PAGES]: (state, { payload: { page } }) => state.setIn(['pagination', 'currentPage'], page),
};

export default reducer;
