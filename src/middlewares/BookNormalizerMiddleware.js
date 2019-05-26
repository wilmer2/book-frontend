import normalize from 'json-api-normalizer';
import has from 'lodash/has';
import hasIn from 'lodash/hasIn';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';

import { mergeEntities } from '@/store/Entities';

const middleware = ({ dispatch }) => next => (action) => {
  if (!has(action, ['payload', 'data'])) return next(action);
  
  let payload = action.payload;
  const normalizeData = normalize(payload);
  const nextPayload = {};

  if (hasIn(payload, ['meta', 'pagination'])) {
    const { meta: { pagination: { totalPages, currentPage, total } } } = payload;

    nextPayload.pagination = {
      totalPages,
      currentPage,
      total,
    };
  }

  if (isArray(payload.data)) {
    merge(nextPayload, { ids: payload.data.map(data => data.id) });
  } else {
    merge(nextPayload, { id: payload.data.id });
  }

  merge(action.payload, nextPayload);

  dispatch(mergeEntities(normalizeData));
  return next(action);
}

export default middleware;
