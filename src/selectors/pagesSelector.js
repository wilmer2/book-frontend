/**
* Selector to have pages
*/
import createDenormalizeSelector from './createDenormalizeSelector';

export const getPagesSelector = (state, getPagesIdsFunc) => createDenormalizeSelector(getPagesIdsFunc, 'pages', state.entities)(state); 
