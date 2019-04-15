import { connect } from 'react-redux';
import { requestPaginationPages } from '../../store/Page';
import { getPagesSelector } from '../../selectors/pagesSelector';
import BookStoryView from './bookStory/BookStoryView';

const makeGetPagesIds = bookId => state => {
  const pageUI = state.ui.page;
  const pages = pageUI.hasIn(['pagination', bookId]) ?
    pageUI.getIn(['pagination', bookId]) : [];

  return pages.map(page => page); 
}

const mapStateToProps = (state, ownProps) => {
  const { bookId, pageId } = ownProps.match.params;
  const pageUI = state.ui.page;
  const pages = getPagesSelector(state, makeGetPagesIds(bookId));

  return {
    isFetching: pageUI.get('isFetching'),
    fetched: pageUI.get('fetched'),
    fetchError: pageUI.get('fetchError'),
    totalPages: pageUI.getIn(['pagination', 'totalPages']),
    currentPage: pageUI.getIn(['pagination', 'currentPage']),
    pages,
    pageId,
    bookId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getPages(params) {
      dispatch(requestPaginationPages(params));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStoryView);
