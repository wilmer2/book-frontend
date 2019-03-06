/**
* Selector to have home books
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getBooksToHome = (state, getBooksIdsFunc) => createDenormalizeSelector(getBooksIdsFunc, 'books', state.entities)(state);

export default {
  getBooksToHome,
};
