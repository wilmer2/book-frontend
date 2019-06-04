import { createDenormalizeSelectorByList, createDenormalizeSelectorById } from './createDenormalizeSelector';

const ENTITY_NAME = 'books';

const getEntities = state => state.entities.get(ENTITY_NAME);

export const getBooksSelector = (state, getBooksIdsFunc) => createDenormalizeSelectorByList(
  getBooksIdsFunc,
  getEntities, 
  ENTITY_NAME, 
  state.entities
)(state);

export const findBookSelector = (state, getBookIdFunc) => createDenormalizeSelectorById(
  getBookIdFunc,
  getEntities, 
  ENTITY_NAME, 
  state.entities
)(state);
