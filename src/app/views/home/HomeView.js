import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import MediumSpinner from '../../components/MediumSpinner';
import ButtonReload from '../../components/ButtonReload';
import CarouselItem from './CarouselItem';
import BookModal from './BookModal';

class HomeView extends PureComponent {
  componentDidMount() {
    if (this.props.fetched) return;
    
    this.handleGetBooks();
  }

  componentDidUpdate(prevProps) {
    if (
        !isEqual(prevProps.categoriesIds, this.props.categoriesIds) ||
        !isEqual(prevProps.lastSearch, this.props.lastSearch)
      ) {
      this.handleGetBooks();
    }
    
  }

  handleGetBooks = () => {
    if (isNull(this.props.categoriesIds)) return this.props.getCategories();  

    this.props.getBooks({
      lastSearch: this.props.lastSearch,
      categoriesIds: this.props.categoriesIds,
    });
  }

  handleOnClickOpenBookModal = bookId => {
    this.props.openBookModal({ bookId });
  }

  renderCarouselByLastSearch() {
    return (!isEmpty(this.props.lastSearch) ? 
      <CarouselItem 
        title="Por última búsqueda" 
        books={this.props.booksByLastSearch} 
        onClickOpenBookModal={this.handleOnClickOpenBookModal}
      /> : null
    );
  }   

  render() {
    if (this.props.isFetching && !this.props.fetchError) return <MediumSpinner />;

    if (this.props.fetched) {
      return (
        <Fragment>
          <CarouselItem 
            title="Más vistos" 
            books={this.props.booksMoreSeen} 
            onClickOpenBookModal={this.handleOnClickOpenBookModal}
          />
          <CarouselItem 
            title="Recomendaciones" 
            books={this.props.booksByCategories} 
            onClickOpenBookModal={this.handleOnClickOpenBookModal}
          />
          {this.renderCarouselByLastSearch()}
          <BookModal />
        </Fragment>
      );
    }

    if (this.props.fetchError) return <ButtonReload onClickFunc={this.handleGetBooks} />;   
  }
}

HomeView.propTypes = {
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

export default HomeView;
