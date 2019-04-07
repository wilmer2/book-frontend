import { createSelectorCreator, defaultMemoize } from 'reselect';
import { is, List } from 'immutable';
import build from 'redux-object';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

export const createImmutableSelector = createSelectorCreator(defaultMemoize, is);

const getEntities = state => state.entities;

const getEntityFactory = entityName => createImmutableSelector(
  getEntities, 
  entities => entities.get(entityName)
);

const createDenormalizeSelector = (getIdsFunc, entityName, rootEntities) => {
  return createImmutableSelector([getIdsFunc, getEntityFactory(entityName)], 
    (idsList, _) => {
      if (isArray(idsList) || idsList instanceof List) {
        return idsList.map(id => build(rootEntities, entityName, id));
      }

      const id = idsList;

      if (isNull(id) || isUndefined(id)) {
        return {};
      }

      return build(rootEntities, entityName, id);
  });
}

export default createDenormalizeSelector;
