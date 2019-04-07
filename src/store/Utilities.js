/**
* Utilities for store
*/
import has from 'lodash/has';

const asyncTypes = {
  PENDING: 'PENDING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const createAsyncTypes = (typeString) => {
  const newAsyncTypes = {};
  
  Object.values(asyncTypes).reduce((newAsyncTypes, asyncValue) => {
    newAsyncTypes[asyncValue] = `${typeString}_${asyncValue}`;
    
    return newAsyncTypes;
  }, newAsyncTypes)

  return newAsyncTypes;
};

export const receivePaginationData = (
  state, 
  { payload: { 
    idsList, 
    totalPages, 
    currentPage, 
    keyPagination 
  } 
}) => state.withMutations(mutator => {
  if (!keyPagination) {
    mutator.setIn(['pagination', currentPage], idsList);
  } else {
    mutator.setIn(['pagination', keyPagination, currentPage], idsList);
  }
  
  mutator.set('fetched', true);
  mutator.set('isFetching', false);
  mutator.set('fetchError', false);
  mutator.setIn(['pagination', 'totalPages'], totalPages);
  mutator.setIn(['pagination', 'currentPage'], currentPage);
});

export const successAsyncStateData = (state, payload) => state.withMutations(mutator => {
  if (has(payload, 'id')) mutator.set('id', payload.id);

  mutator.set('fetched', true);
  mutator.set('fetchError', false);
  mutator.set('isFetching', false);

});

export const pedingAsyncStateData = state => state.withMutations(mutator => {
  if (has(mutator, 'id')) mutator.set('id', null);

  mutator.set('fetched', false);
  mutator.set('fetchError', false);
  mutator.set('isFetching', true);
});
 

export const errorAsyncStateData = (state, payload) => state.merge({
  isFetching: false,
  fetchError: true,
  errorMessage: has(payload, 'errors') ? payload.errors : '',
});

export const requestPaginationPage = (state, { payload: { page } }) => state.setIn(['pagination', 'currentPage'], page);
