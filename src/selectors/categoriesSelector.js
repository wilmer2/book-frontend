/**
* Selector  to obtain denormalized categories
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getCategoriesIds = state => state.ui.category.get('idsList');

export const getCategoriesSelector = state => createDenormalizeSelector(getCategoriesIds, 'categories', state.entities)(state);
