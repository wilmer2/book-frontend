import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediumSpinner from '../../components/MediumSpinner';
import ButtonReload from '../../components/ButtonReload';

class HomeView extends PureComponent {
  /*componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.handleGetBooks();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authFetched !== this.props.authFetched && this.props.authFetched) {
      this.handleGetBooks();
    }
  }*/

  handleGetBooks = () => {
    this.props.getBooks({
      lastSearch: this.props.lastSearch,
      categoriesIds: this.props.categoriesIds,
    });
  }

  render() {
    if (this.props.fetched) {
      //
    }

    if (this.props.fetchError) {
      return (
        <ButtonReload onClickFunc={this.handleGetBooks} />
      );
    }

    if (this.props.isFetching) {
      return (
        <MediumSpinner />
      );
    }
  }
}

HomeView.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  lastSearch: PropTypes.string,
  categoriesIds: PropTypes.array,
  authFetched: PropTypes.bool.isRequired,
  booksMoreSeen: PropTypes.object.isRequired,
  booksByCategories: PropTypes.object.isRequired,
  booksByLastSearch: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired,
};

export default HomeView;
