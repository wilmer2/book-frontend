/**
* Selector to have users
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getAuthenticatedId = state => state.ui.authenticated.get('id');
const getAuthenticatedUser = state => createDenormalizeSelector(getAuthenticatedId, 'authenticated', state.entities)(state); 

export default {
  getAuthenticatedUser,
};
