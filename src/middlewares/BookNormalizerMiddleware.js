import normalize from 'json-api-normalizer';
import _ from 'lodash';
import { mergeEntities } from '../store/Entities';

const middleware = ({ dispatch }) => next => (action) => {
  if (!_.has(action, ['payload', 'data'])) {
    return next(action);
  }

  let payload = action.payload;
  let normalizeData;
  const nextPayload = {};

  if (_.has(payload, 'endpoint')) {
    const endpoint = payload.endpoint;
    payload = _.omit(payload, ['endpoint']);

    normalizeData = normalize(payload, { endpoint, filterEndpoint: false });
  } else {
    normalizeData = normalize(payload);
  }

  if (_.hasIn(payload, ['meta', 'pagination'])) {
    const pagination = _.omit(payload, ['include', 'custom']);;

    nextPayload.pagination = {
      totalPages: pagination.total_pages,
      currentPage: pagination.current_page,
    };
  }

  if (_.isArray(payload.data)) {
    _.merge(nextPayload, { idsList: payload.data.map(data => data.id) });
  } else {
    _.merge(nextPayload, { id: payload.data.id });
  }

  _.merge(action.payload, nextPayload);


  dispatch(mergeEntities(normalizeData));
  return next(action);
}

export default middleware;
