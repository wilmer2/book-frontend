/**
* Selector to have users
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getAuthenticatedId = state => state.ui.authenticated.get('id');

export const getAuthenticatedUserSelector = state => createDenormalizeSelector(getAuthenticatedId, 'authenticated', state.entities)(state); 
