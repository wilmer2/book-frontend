import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
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

const getEntitiesFactory = (entitiyName) => {
  return createSelector(
    getEntities,
    (entities) => entities.get(entitiyName)
  );
}

const createDenormalizeSelector = (getIdsFunc, entitiyName, rootBuild) => {
  return createImmutableSelector([getIdsFunc, getEntitiesFactory(entitiyName)], 
    (idsList, _) => {
      if (isArray(idsList) || idsList instanceof List) {
        return idsList.map(id => build(rootBuild, entitiyName, id));
      }

      const id = idsList;

      if (isNull(id) || isUndefined(id)) {
        return {};
      }

      return build(rootBuild, entitiyName, id);
  });
}

export default createDenormalizeSelector;
