import { createSelectorCreator, defaultMemoize } from 'reselect';
import { is, List } from 'immutable';
import build from 'redux-object';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

export const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  is
);

const getEntities = state => state.entities;

const getEntityFactory = (entitiyName) => {
  return createImmutableSelector(
    getEntities, 
    entities => entities.get(entitiyName)
  );
}

const createDenormalizeSelector = (getIdsFunc, entitiyName, rootEntities) => {
  return createImmutableSelector([getIdsFunc, getEntityFactory(entitiyName)], 
    (idsList, _) => {
      if (isArray(idsList) || idsList instanceof List) {
        return idsList.map(id => build(rootEntities, entitiyName, id));
      }

      const id = idsList;

      if (isNull(id) || isUndefined(id)) {
        return {};
      }

      return build(rootEntities, entitiyName, id);
  });
}

export default createDenormalizeSelector;
