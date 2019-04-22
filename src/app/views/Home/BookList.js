import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import ButtonReload from '@/app/components/ui/ButtonReload';
import CarouselItem from './CarouselItem';
import BookModal from './BookModal';

const CarouselByLastSearch = (props) => {
  if (isEmpty(props.lastSearch)) return null;

  return (
    <CarouselItem
      title="Por última búsqueda" 
      books={props.books} 
      onClickOpenBookModal={props.onClickOpenBookModal}
    />
  );
}

const Carousels = (props) => {
  return (
    <Fragment>
      <CarouselItem 
        title="Más vistos" 
        books={props.booksMoreSeen} 
        onClickOpenBookModal={props.onClickOpenBookModal}
      />
      <CarouselItem 
        title="Recomendaciones" 
        books={props.booksByCategories} 
        onClickOpenBookModal={props.onClickOpenBookModal}
      />
      <CarouselByLastSearch
        lastSearch={props.lastSearch} 
        books={props.booksByLastSearch}
        onClickOpenBookModal={props.onClickOpenBookModal}
      />
      <BookModal />
    </Fragment>
  );
}

class BookList extends PureComponent {
  componentDidMount() {
    if (!this.props.fetched) this.handleGetBooks();
  }

  componentDidUpdate(prevProps) {
    const { categoriesIds, lastSearch } = this.props;

    if (
        !isEqual(prevProps.categoriesIds, categoriesIds) ||
        !isEqual(prevProps.lastSearch, lastSearch)
      ) {
      this.handleGetBooks();
    }
    
  }

  handleGetBooks = () => {
    const { categoriesIds, lastSearch } = this.props;

    if (!categoriesIds) return this.props.getCategories();  

    this.props.getBooks({
      lastSearch,
      categoriesIds,
    });
  }

  handleOnClickOpenBookModal = (bookId) => {
    this.props.openBookModal({ bookId });
  }

  render() {
    const { isFetching, fetchError, fetched } = this.props;

    return (
      <Fragment>
        {isFetching && !fetchError && <MediumSpinner />}

        {fetched && <Carousels
          lastSearch={this.props.lastSearch}
          booksMoreSeen={this.props.booksMoreSeen}
          booksByLastSearch={this.props.booksByLastSearch}
          booksByCategories={this.props.booksByCategories}
          onClickOpenBookModal={this.handleOnClickOpenBookModal}
        />}

        {fetchError && <ButtonReload onClickFunc={this.handleGetBooks} />}
      </Fragment>
    ); 
  }
}

BookList.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  lastSearch: PropTypes.string,
  categoriesIds: PropTypes.array,
  booksMoreSeen: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  booksByCategories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  booksByLastSearch: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  getBooks: PropTypes.func.isRequired,
  openBookModal: PropTypes.func.isRequired,
};

export default BookList;
