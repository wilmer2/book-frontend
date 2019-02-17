/**
* Select to get Authenticated User
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getAuthenticatedId = state => state.ui.authenticated.get('id');

const getAuthenticatedUser = (state) => {
  return createDenormalizeSelector(getAuthenticatedId, 'authenticated', state.entities)(state);
}

export default getAuthenticatedUser;
