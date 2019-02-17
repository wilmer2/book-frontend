import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class BookItem extends PureComponent {
  //
}

BookItem.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like_count: PropTypes.number.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
};

export default BookItem;
