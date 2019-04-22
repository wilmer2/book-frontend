import { createSelectorCreator, defaultMemoize } from 'reselect';
import { is } from 'immutable';
import build from 'redux-object';

export const createImmutableSelector = createSelectorCreator(defaultMemoize, is);
    
export const createDenormalizeSelectorById = (
  getIdFunc,
  getEntitiesFunc,
  entityName,
  rootEntities
) => createImmutableSelector([getIdFunc, getEntitiesFunc],
  (id, _) => id ? build(rootEntities, entityName, id) : {}
);

export const createDenormalizeSelectorByList = (
  getIdsFunc,
  getEntitiesFunc,
  entityName,
  rootEntities
) => createImmutableSelector([getIdsFunc, getEntitiesFunc],
  (ids, _) => ids.map(id => build(rootEntities, entityName, id))
);
