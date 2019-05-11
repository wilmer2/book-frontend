import has from 'lodash/has';
import isArray from 'lodash/isArray';

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

const resolverByKeyMerge = (state, resolverObj, keyMerge) => {
  return !keyMerge ? state.merge(resolverObj) : state.mergeDeep({
    [keyMerge]: {
      ...resolverObj,
    },
  });
}

const successResolverPagination = (
  state, 
  { 
    ids, 
    pagination: {
      currentPage,
      totalPages
    }, 
  },
  infinityPagination 
) => state.withMutations((mutator) => {

  if (infinityPagination) {
    mutator.updateIn(['pagination', 'ids'], (entityIds) => {
      const oldIds = isArray(entityIds) ? entityIds : entityIds.toArray();

      return oldIds.concat(ids);
    });
  } else {
    mutator.setIn(['pagination', 'ids'], ids);
  }

  mutator.set('fetched', true);
  mutator.set('isFetching', false);
  mutator.set('fetchError', false);
  mutator.setIn(['pagination', 'totalPages'], totalPages);
  mutator.setIn(['pagination', 'currentPage'], currentPage);
});

export const resetPagination = state => state.withMutations((mutator) => {
  mutator.set('fetched', false);
  mutator.set('isFetching', false);
  mutator.set('fetchError', false);
  mutator.setIn(['pagination' ,'ids'], []);
  mutator.setIn(['pagination', 'totalPages'], 1);
  mutator.setIn(['pagination', 'currentPage'], 1);
});

const resetResolver = (state, keyMerge) => {
  const resolverObj = {
    fetched: false,
    fetchError: false,
    isFetching: false,
    errorMessage: '',
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const successResolverId = (state, { id }, keyMerge) => {
  const resolverObj = {
    fetched: true,
    fetchError: false,
    isFetching: false,
    id,
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const successResolverPlain = (state, keyMerge) => {
  const resolverObj = {
    fetched: true,
    fetchError: false,
    isFetching: false,
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const successResolver = (
  state, 
  payload, 
  keyMerge, 
  infinityPagination
) => {
  if (payload) {
    if (has(payload, 'id')) return successResolverId(state , payload, keyMerge);
    if (has(payload, 'pagination')) return successResolverPagination(
      state, 
      payload, 
      infinityPagination
    );
  }

  return successResolverPlain(state, keyMerge);
}


const pedingResolverId = (state, keyMerge) => {
  const resolverObj = {
    fetched: false,
    fetchError: false,
    isFetching: true,
    id: null,
    errorMessage: '',
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const pedingResolverPlain = (state, keyMerge) => {
  const resolverObj = {
    fetched: false,
    fetchError: false,
    isFetching: true,
    errorMessage: '',
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const pendingResolver = (state, payload, keyMerge) => {
  return payload && has(payload, 'id') ? pedingResolverId(state, keyMerge) :
    pedingResolverPlain(state, keyMerge);
}

const errorResolverMessage = (state, { errors }, keyMerge) => {
  const resolverObj = {
    isFetching: false,
    fetchError: true,
    errorMessage: errors,
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const errorResolverPlain = (state, keyMerge) => {
  const resolverObj = {
    isFetching: false,
    fetchError: true,
  };

  return resolverByKeyMerge(state, resolverObj, keyMerge);
}

const errorResolver = (state, payload, keyMerge) => {
  return payload && has(payload, 'errors') ? errorResolverMessage(state, payload, keyMerge) :
    errorResolverPlain(state, keyMerge);
}


export const createResolver = (keyMerge) => {
  const resolver = {
    success(state, payload, infinityPagination) {
      return successResolver(state, payload, keyMerge, infinityPagination);
    },

    pending(state, payload) {
      return pendingResolver(state, payload, keyMerge);
    },

    error(state, payload) {
      return errorResolver(state, payload, keyMerge);
    },

    reset(state, payload) {
      return resetResolver(state, keyMerge);
    },
  };

  return resolver;
}
