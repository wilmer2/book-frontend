import { createDenormalizeSelectorByList, createDenormalizeSelectorById } from './createDenormalizeSelector';

const ENTITY_NAME = 'pages';

const getEntities = state => state.entities.get(ENTITY_NAME);

export const getPagesSelector = (state, getPagesIdsFunc) => createDenormalizeSelectorByList(
  getPagesIdsFunc,
  getEntities, 
  ENTITY_NAME, 
  state.entities
)(state);

export const findPageSelector = (state, getPageIdFunc) => createDenormalizeSelectorById(
  getPageIdFunc,
  getEntities, 
  ENTITY_NAME, 
  state.entities
)(state);

