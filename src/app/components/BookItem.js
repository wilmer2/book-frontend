import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Img from 'react-image';
import bookImage from '../../images/bookImage.jpeg';
import withLinkStopPropagation from './WithLinkStopPropagationEnhancer';

class BookItem extends PureComponent {
  handleOnClickBook = () => {
    this.props.onClickBook(this.props.book.id);
  }

  render() {
    const book = this.props.book;
    const user = this.props.book.user;

    return (
      <div className="columns" onClick={this.handleOnClickBook}>
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
          {book.name}
          </h3>
          <div>
            <Link to={`/user/${user.id}`} onClick={this.props.onClickLink}>by {user.name}</Link>
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
  onClickBook: PropTypes.func.isRequired,
};

export default withLinkStopPropagation(BookItem);
