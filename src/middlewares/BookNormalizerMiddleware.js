import normalize from 'json-api-normalizer';
import _ from 'lodash';
import { mergeEntities } from '../store/Entities';

const middleware = ({ dispatch }) => next => (action) => {
  if (!_.has(action, ['payload', 'data'])) {
    return next(action);
  }

  const normalizeData = normalize(action.payload);

  dispatch(mergeEntities(normalizeData));
  next(action);
}

export default middleware;
