import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import BookItem from '../../components/BookItem';
import Modal from '../../components/Modal';
import isEmpty from 'lodash/isEmpty';
import { closeBookModal } from '../../../store/Book';
import { getBooksSelector } from '../../../selectors/booksSelector';

const getBookIdModal = state => state.ui.book.getIn(['homeData', 'bookIdModal']);

const mapStateToProps = (state) => {
  const openModal = state.ui.book.getIn(['homeData', 'openModal']);
  const bookModal = getBooksSelector(state, getBookIdModal);

  return {
    openModal, 
    bookModal,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeBookModal() {
      dispatch(closeBookModal());
    },
  }
}

class BookModal extends PureComponent {
  componentWillUnmount() {
    if (this.props.openModal) this.props.closeBookModal();
  }

  handleOnClickBook = (bookId) => {
    this.props.history.push(`/book/${bookId}`);
  }

  render() {
    if (isEmpty(this.props.bookModal)) {
      return null;
    }

    return (
      <Modal  
        onCloseModal={this.props.closeBookModal}
        open={this.props.openModal}
      >
        <BookItem 
          book={this.props.bookModal} 
          onClickBook={this.handleOnClickBook}
        />
        <div className="column">
          <button className="button is-primary">
            Leer más
          </button>
        </div>
      </Modal>
    );
  }
}

BookModal.propTypes = {
  bookModal: PropTypes.object.isRequired,
  openModal: PropTypes.bool.isRequired,
  closeBookModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookModal));
