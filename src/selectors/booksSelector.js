/**
* Selector to have home books
*/
import createDenormalizeSelector from './createDenormalizeSelector';

export const getBooksSelector = (state, getBooksIdsFunc) => createDenormalizeSelector(getBooksIdsFunc, 'books', state.entities)(state);
