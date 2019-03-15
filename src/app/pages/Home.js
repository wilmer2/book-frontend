import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import HomeView from './home/HomeView';
import { getBooksToHomePending, openBookModal } from '../../store/Book';
import { getCategoriesPending } from '../../store/Category';
import { getBooksSelector } from '../../selectors/booksSelector';
import { usersSelector, categoriesSelector }  from '../../selectors';

const getCategoriesIds = createSelector(
  usersSelector.getAuthenticatedUser,
  categoriesSelector.getCategories,
  (authenticatedUser, categories) => {
    if (!isEmpty(authenticatedUser)) {
      authenticatedUser.preferences.map(category => console.log(category.id));
      return authenticatedUser.preferences.map(category => category.id);
    }

    return !isEmpty(categories) ? categories.map(category => category.id) : null;   
  }
);

const getBooksIdsMoreSeen = state => state.ui.book.getIn(['homeData', 'booksIdsMoreSeen']);
const getBooksIdsByCategories = state => state.ui.book.getIn(['homeData', 'booksIdsByCategories']);
const getBooksIdsByLastSearch = state => state.ui.book.getIn(['homeData', 'booksIdsByLastSearch']);

const mapStateToProps = (state, ownProps) => {
  const homeData = state.ui.book.get('homeData');
  const categoryData = state.ui.category;
  const categoriesIds = getCategoriesIds(state);
  const booksMoreSeen = getBooksSelector(state, getBooksIdsMoreSeen);
  const booksByCategories = getBooksSelector(state, getBooksIdsByCategories);
  const booksByLastSearch = getBooksSelector(state, getBooksIdsByLastSearch);
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
    },

    openBookModal(params) {
      dispatch(openBookModal(params));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
