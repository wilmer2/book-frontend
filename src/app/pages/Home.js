import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import lodash from 'lodash';
import HomeView from './home/HomeView';
import { getBooksToHomePending } from '../../store/Book';

import { 
  getBooksSelector, 
  getAuthenticatedUser, 
  categoriesSelector 
}  from '../../selectors';

const getCategoriesIds = createSelector(
  getAuthenticatedUser,
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
  const authFetched = state.ui.authenticated.get('fetched');
  const categoriesIds = getCategoriesIds(state);
  const booksMoreSeen = getBooksSelector(state, getBooksIdsMoreSeen);
  const booksByCategories = getBooksSelector(state, getBooksIdsByCategories);
  const booksByLastSearch = getBooksSelector(state, getBooksIdsByLastSearch);

  return {
    fetched: homeData.get('fetched'),
    isFetching: homeData.get('isFetching'),
    fetchError: homeData.get('fetchError'),
    lastSearch: homeData.get('lastSearch'),
    categoriesIds,
    authFetched,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
