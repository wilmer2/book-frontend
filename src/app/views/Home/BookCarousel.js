import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import ButtonReload from '@/app/components/ui/ButtonReload';
import CarouselItem from './CarouselItem';
import BookModal from './BookModal';

const CarouselByLastSearch = (props) => {
  const { lastSearch, books } = props;

  if (isEmpty(lastSearch)) return null;

  return (
    <CarouselItem
      title="Por última búsqueda" 
      books={books} 
      onClickOpenBookModal={props.onClickOpenBookModal}
    />
  );
}

const CarouselByCategories = (props) => {
  const { books } = props

  if (!books.length) return null;

  return (
    <CarouselItem 
      title="Recomendaciones" 
      books={books} 
      onClickOpenBookModal={props.onClickOpenBookModal}
    />
  );
}

const Carousels = props => <Fragment
>
  <CarouselItem 
    title="Más vistos" 
    books={props.booksMoreSeen} 
    onClickOpenBookModal={props.onClickOpenBookModal}
  />
  <CarouselByCategories  
    books={props.booksByCategories} 
    onClickOpenBookModal={props.onClickOpenBookModal}
  />
  <CarouselByLastSearch
    lastSearch={props.lastSearch} 
    books={props.booksByLastSearch}
    onClickOpenBookModal={props.onClickOpenBookModal}
  />
  <BookModal />
</Fragment>;
  
class BookCarousel extends PureComponent {
  componentDidMount() {
    this.handleGetBooks();
  }

  componentDidUpdate(prevProps) {
    const { categoriesIds } = this.props;
    const prevCategoriesIds = prevProps.categoriesIds;

    if (prevCategoriesIds && !isEqual(categoriesIds, prevCategoriesIds))
      this.handleGetBooks();
  }

  handleGetBooks = () => {
    const { categoriesIds, lastSearch } = this.props;  

    this.props.getBooks({
      lastSearch,
      categoriesIds,
    });
  }

  handleOnClickOpenBookModal = (bookId) => {
    this.props.openBookModal({ bookId });
  }

  render() {
    const { 
      fetched,
      isFetching, 
      fetchError,
      lastSearch,
      booksMoreSeen,
      booksByCategories,
      booksByLastSearch 
    } = this.props;

    return (
      <Fragment>
        {isFetching && !fetchError && <MediumSpinner />}
        {fetchError && <ButtonReload onClickFunc={this.handleGetBooks} />}
        {fetched && <Carousels
          lastSearch={lastSearch}
          booksMoreSeen={booksMoreSeen}
          booksByCategories={booksByCategories}
          booksByLastSearch={booksByLastSearch}
          onClickOpenBookModal={this.handleOnClickOpenBookModal}
        />}

      </Fragment>
    ); 
  }
}

BookCarousel.propTypes = {
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

export default BookCarousel;
