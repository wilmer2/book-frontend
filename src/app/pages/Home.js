import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import HomeView from './home/HomeView';
import { getBooksToHomePending } from '../../store/Book';
import { getCategoriesPending } from '../../store/Category';

import { 
  booksSelector, 
  usersSelector,
  categoriesSelector 
}  from '../../selectors';

const getCategoriesIds = createSelector(
  usersSelector.getAuthenticatedUser,
  categoriesSelector.getCategories,
  (authenticatedUser, categories) => {
    if (!isEmpty(authenticatedUser)) {
      return authenticatedUser.preferences.map(category => category.id);
    }

    return !isEmpty(categories) ? categories.map(category => category.id) : null;   
  }
);

const getBooksIdsMoreSeen = state => state.ui.book.getIn(['homeData', 'booksIdsMoreSeen']);
const getBooksIdsByCategories = state => state.ui.book.getIn(['homeData', 'booksIdsByCategories']);
const getBooksIdsByLastSearch = state => state.ui.book.getIn(['homeData', 'booksIdsByLastSearch']);

const mapStateToProps = (state) => {
  const homeData = state.ui.book.get('homeData');
  const categoryData = state.ui.category;
  const categoriesIds = getCategoriesIds(state);
  const booksMoreSeen = booksSelector.getBooksToHome(state, getBooksIdsMoreSeen);
  const booksByCategories = booksSelector.getBooksToHome(state, getBooksIdsByCategories);
  const booksByLastSearch = booksSelector.getBooksToHome(state, getBooksIdsByLastSearch);
  const fetchError = homeData.get('fetchError') || categoryData.get('fetchError');
  const isFetching = homeData.get('isFetching') || categoryData.get('isFetching');
 
  return {
    fetched: homeData.get('fetched'), 
    lastSearch: homeData.get('lastSearch'),
    isFetching,
    fetchError,
    categoriesIds,
    booksMoreSeen,
    booksByCategories,
    booksByLastSearch,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks(params) {
      dispatch(getBooksToHomePending(params));
    },

    getCategories() {
      dispatch(getCategoriesPending());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
