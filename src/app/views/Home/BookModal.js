import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import BookItem from '@/app/components/ui/BookItem';
import Modal from '@/app/components/wrappers/Modal';
import { closeBookModal } from '@/store/Book';
import { findBookSelector } from '@/selectors/booksSelector';
import isEmpty from 'lodash/isEmpty';

const getBookIdModal = state => state.ui.book.getIn(['homeData', 'bookIdModal']);

const mapStateToProps = (state) => {
  const openModal = state.ui.book.getIn(['homeData', 'openModal']);
  const bookModal = findBookSelector(state, getBookIdModal);

  return {
    openModal, 
    bookModal,
  };
}

const mapDispatchToProps = dispatch => ({
  closeBookModal() {
    dispatch(closeBookModal());
  },
});

const BookModalItem = props => <Modal  
  onCloseModal={props.closeBookModal}
  open={props.openModal}
>
  <br />
  <BookItem 
    book={props.book} 
    onClickBook={props.onClickBook}
  />
  <br />
  <Link to={`/book/${props.book.id}/story`} className="button is-primary">
    Empezar a leer
  </Link>
</Modal>;

class BookModal extends PureComponent {
  componentWillUnmount() {
    if (this.props.openModal) this.props.closeBookModal();
  }

  handleOnClickBook = (bookId) => {
    this.props.history.push(`/book/${bookId}`);
  }

  render() {
    const book = this.props.bookModal;

    return (
      <Fragment>
        {!isEmpty(book) && <BookModalItem 
          closeBookModal={this.props.closeBookModal}
          openModal={this.props.openModal}
          onClickBook={this.handleOnClickBook}
          book={book}
        />}
      </Fragment>
    );
  }
}

BookModal.propTypes = {
  bookModal: PropTypes.object.isRequired,
  openModal: PropTypes.bool.isRequired,
  closeBookModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookModal));
