/**
* Selector to have home books
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getBooksSelector = (state, getBooksIdsFunc) => {
  return createDenormalizeSelector(getBooksIdsFunc, 'books', state.entities)(state);
}

export default getBooksSelector;
