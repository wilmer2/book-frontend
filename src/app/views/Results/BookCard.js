import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import bookCardImage from '@/images/bookCardImage.jpeg';

class BookCard extends PureComponent {
  handleOnClick = () => {
    const { book } = this.props;

    this.props.onClickBook(book.id);
  }

  render() {
    const { book } = this.props;
    const { user } = book;

    return (
      <div className="card" onClick={this.handleOnClick}>
        <div className="card-image">
          <figure className="image is-4by3">
            <img 
              alt={book.name}
              src={
                bookCardImage
              }
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{book.name}</p>
              <p className="subtitle is-6">by {user.email}</p>
            </div>
          </div>
          <div className="content">
            {book.description}
            <br />
            <b>
              <i className="fas fa-eye fa-fw"></i>
              {book.views}
            </b>
            <b> 
              <i className="fas fa-thumbs-up fa-fw"></i>
              {book.likeCount}
            </b>
          </div>
        </div>
      </div>
    );
  }
}


BookCard.propTypes = {
  onClickBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
};

export default BookCard;
