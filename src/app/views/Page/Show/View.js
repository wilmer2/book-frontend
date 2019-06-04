import { connect } from 'react-redux';
import { getPagesPending, resetPagePagination } from '@/store/Page';
import { getBookByIdPending, resetBookId } from '@/store/Book';
import { getPagesSelector } from '@/selectors/pagesSelector';
import { findBookSelector } from '@/selectors/booksSelector';

import Story from './Story';

const getBookId = state => state.ui.book.getIn(['byId', 'id']);
const getPageIds = state => state.ui.page.getIn(['pagination', 'ids']);

const mapStateToProps = (state, ownProps) => {
  const { pageId, bookId } = ownProps.match.params;
  
  const book = findBookSelector(state, getBookId);
  const pages = getPagesSelector(state, getPageIds);
  const bookUI = state.ui.book.get('byId');
  const pageUI = state.ui.page;

  return {
    fetched: bookUI.get('fetched'),
    fetchError: bookUI.get('fetchError'),
    isFetching: bookUI.get('isFetching'),
    bookId,
    book,
    pageUI,
    pageId,
    pages,
  };
}

const mapDispatchToProps = dispatch => ({
  getPages(params) {
    dispatch(getPagesPending(params));
  },

  getBook(params) {
    dispatch(getBookByIdPending(params));
  },

  resetBookId() {
    dispatch(resetBookId());
  },

  resetPagePagination() {
    dispatch(resetPagePagination());
  },
}); 

export default connect(mapStateToProps, mapDispatchToProps)(Story);
