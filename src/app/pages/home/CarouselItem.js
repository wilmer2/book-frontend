import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import BookItem from '../../components/BookItem';

class CarouselItem extends PureComponent {
  render() {
    return (
      <Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.props.title}
              </h1>
            </div>
          </div>
        </section>
        <Carousel>
          {this.props.books.map(book => <BookItem key={`${book.id}-${this.props.title}`} book={book} />)}
        </Carousel>    
      </Fragment>
    );
  }
}

CarouselItem.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default CarouselItem;
