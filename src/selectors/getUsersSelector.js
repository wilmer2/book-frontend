/**
* Selector to have users
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getUsersSelector = (state, getUsersIdsFunc) => {
  return createDenormalizeSelector(getUsersIdsFunc, 'users', state.entities)(state);
}

export default getUsersSelector;
