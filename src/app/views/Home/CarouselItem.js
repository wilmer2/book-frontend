import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import BookItem from '@/app/components/ui/BookItem';

class CarouselItem extends PureComponent {
  render() {
    const { title, books } = this.props;

    return (
      <Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {title}
              </h1>
            </div>
          </div>
        </section>
        <Carousel>
          {books.map(book => <BookItem 
            key={`${book.id}-${title}`} 
            book={book}
            onClickBook={this.props.onClickOpenBookModal} 
          />)}
        </Carousel>    
      </Fragment>
    );
  }
}

CarouselItem.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClickOpenBookModal: PropTypes.func.isRequired,
};

export default CarouselItem;
