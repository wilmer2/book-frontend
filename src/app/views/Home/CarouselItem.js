import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import BookItem from '@/app/components/ui/BookItem';
import styled from 'styled-components';

const CarouselWrapped = styled.div`
  margin-bottom: 30px;
`;

class CarouselItem extends PureComponent {
  state = {
    breakPoints: [
      { width: 1, itemsToShow: 1 },
      { width: 850, itemsToShow: 3}
    ],
  }

  render() {
    const { title, books } = this.props;

    return (
      <CarouselWrapped>
        <h2 className="title">{title}</h2>
        <Carousel breakPoints={this.state.breakPoints}>
          {books.map(book => <BookItem 
            key={`${book.id}-${title}`} 
            book={book}
            onClickBook={this.props.onClickOpenBookModal} 
          />)}
        </Carousel>    
      </CarouselWrapped>
    );
  }
}

CarouselItem.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClickOpenBookModal: PropTypes.func.isRequired,
};

export default CarouselItem;
