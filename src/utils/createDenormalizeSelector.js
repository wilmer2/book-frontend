import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { is, Map, List } from 'immutable';
import build from 'redux-object';
import { isArray, isUndefined, isNull } from 'lodash';

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
        return Map({});
      }

      return build(rootBuild, entitiyName, id);
  });
}

export default createDenormalizeSelector;
