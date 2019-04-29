import { createDenormalizeSelectorById } from './createDenormalizeSelector';

const AUTHENTICATED_ENTITY = 'authenticated';

const getAuthenticatedId = state => state.ui.authenticated.get('id');
const getAuthenticatedEntity = state => state.entities.get(AUTHENTICATED_ENTITY);

export const getAuthenticatedUserSelector = state => createDenormalizeSelectorById(
  getAuthenticatedId, 
  getAuthenticatedEntity,
  AUTHENTICATED_ENTITY, 
  state.entities
)(state); 
