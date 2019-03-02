import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class BookItem extends PureComponent {
  //
}

const getUserId = book => () => book.user_id;

const mapStateToProps = (state, props) => {
  const book = props.book;
  const user =
  return {
    //
  }
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
