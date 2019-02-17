import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

class CarouselItem extends PureComponent {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {this.props.title}
            </h1>
          </div>
        </div>
      </section>
    );
  }
}

CarouselItem.propTypes = {
  books: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default CarouselItem;