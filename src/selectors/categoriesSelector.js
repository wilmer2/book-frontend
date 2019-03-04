/**
* Selector  to obtain denormalized categories
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getCategoriesIds = state => state.ui.category.get('idsList');
const getCategories = state => createDenormalizeSelector(getCategoriesIds, 'categories', state.entities)(state);

export default {
  getCategories,
};
