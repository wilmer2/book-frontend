import { createDenormalizeSelectorByList } from './createDenormalizeSelector';

const ENTITY_NAME = 'categories';

const getCategoriesIds = state => state.ui.category.get('ids');
const getEntities = state => state.entities.get(ENTITY_NAME);

export const getCategoriesSelector = state => createDenormalizeSelectorByList(
  getCategoriesIds,
  getEntities, 
  ENTITY_NAME, 
  state.entities  
)(state);
