import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooksSelector } from '@/selectors/booksSelector';
import { getBooksPending } from '@/store/Book';
import queryString from 'query-string';
import Pagination from 'react-js-pagination';
import BookItem from '@/app/components/ui/BookItem';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import ButtonReload from '@/app/components/ui/ButtonReload';
import EmptyMessage from '@/app/components/ui/EmptyMessage';


const getBookIds = state => state.ui.book.getIn(['pagination', 'ids']);

const mapStateToProps = (state) => {
  const books = getBooksSelector(state, getBookIds);
  const bookUI = state.ui.book;

  return {
    fetched: bookUI.get('fetched'),
    fetchError: bookUI.get('fetchError'),
    isFetching: bookUI.get('isFetching'),
    currentPage: bookUI.getIn(['pagination', 'currentPage']),
    total: bookUI.getIn(['pagination', 'total']),
    books,
  };
}

const mapDispatchToProps = dispatch => ({
  getBooks(params) {
    dispatch(getBooksPending(params));
  },
});

const BookPagination = (props) => {
  const { total, currentPage, books } = props;

  if (total === 0) return <EmptyMessage />;

  return (<Fragment>
    <div className="column">
      {books.map(book => <BookItem 
        key={book.id}
        book={book} 
        onClickBook={props.onClickBook} 
      />)}
    </div>
    <div className="column">
      <Pagination 
        activePage={currentPage}
        totalItemsCount={total}
        onChange={props.onChangePage}
      />
    </div>
  </Fragment>);
}

class BookList extends PureComponent {
  state = {
    page: 1,
  }

  componentDidMount() {
    this.handleGetBooks(this.state.page);
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props;

    if (search !== prevProps.search) {
      const page = 1;

      this.handleGetBooks(page);
    }
  }

  handleOnClickBook = (bookId) => {
    this.props.history.push(`/book/${bookId}`);
  }

  handleOnClickError = () => {
    this.handleGetBooks(this.state.page);
  }

  handleGetBooks = (page) => {
    const search = queryString.parse(this.props.search);

    this.props.getBooks({
      page,
      ...search,
      include: 'user',
    });

    if (page === this.state.page) return;

    this.setState({ page });
  }

  render() {
    const { 
      fetched, 
      fetchError, 
      isFetching, 
      books,
      currentPage,
      total, 
    } = this.props;

    return (
      <Fragment>
        {isFetching && <MediumSpinner />}
        {fetchError && <ButtonReload onClickFunc={this.handleOnClickError} />}
        {fetched && <BookPagination 
          total={total}
          currentPage={currentPage}
          books={books}
          onClickBook={this.handleOnClickBook}
          onChangePage={this.handleGetBooks}
        />}
      </Fragment>
    );

  }
}

BookList.propTypes = {
  fetched: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  search: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
