import { connect } from 'react-redux';
import { getPagesPending } from '@/store/Page';
import { getPagesSelector } from '@/selectors/pagesSelector';
import PageShow from './PageShow';

const getPageIds = state => state.ui.page.getIn(['pagination', 'ids']);

const mapStateToProps = (state, ownProps) => {
  const { bookId, pageId } = ownProps.match.params;
  const pageUI = state.ui.page;
  const pages = getPagesSelector(state, getPageIds);

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

const mapDispatchToProps = dispatch => ({
  getPages(params) {
    dispatch(getPagesPending(params));
  }
}); 

export default connect(mapStateToProps, mapDispatchToProps)(PageShow);
