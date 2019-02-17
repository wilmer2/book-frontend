/**
* Selector  to obtain denormalized categories
*/
import createDenormalizeSelector from './createDenormalizeSelector';

const getCategoriesIds = (state) => {
  const categories = state.entities.get('categories');

  return categories.size ? categories.map(category => category.get('id')) : null;
}

const getCategoriesSelector = (state) => {
  return createDenormalizeSelector(getCategoriesIds, 'categories', state.entities)(state);
}

 export default getCategoriesSelector;
