import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Img from 'react-image';
import bookImage from '../../images/bookImage.jpeg';


class BookItem extends PureComponent {
  render() {
    const book = this.props.book;
    const user = this.props.book.user;

    return (
      <div className="columns">
        <div className="column">
          <figure>
            <Img 
              alt={book.name}
              src={[
                book.imageUrl,
                bookImage
              ]}
            />
          </figure>
        </div>
        <div className="column">
          <h3>
            <Link to="book/{book.id}">{book.name}</Link>
          </h3>
          <div>
            <Link to="user/{user.id}">by {user.name}</Link>
          </div>
          <div>
            <span>
              <i className="fas fa-eye"></i>
              {book.views}
            </span>
            <span>
              <i className="fas fa-thumbs-up"></i>
              {book.likeCount}
            </span>
          </div>
          <div className="content">
            <p>
              {book.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

BookItem.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookItem;
