import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

class ButtonLoadMore extends PureComponent {
  handleOnClickNextPage = () => {
    const nextPage = this.props.currentPage++;

    this.props.onClickLoadMore(nextPage);
  }

  render() {
    const { currentPage, totalPages, isFetching } = this.props;

    if (isEqual(currentPage, totalPages)) return null;

    return (
      <button 
        className={`button is-success ${isFetching && 'is-loading'}`} 
        onClick={this.handleOnClickNextPage}
        disabled={isFetching}
      >
        Ver más
      </button> 
    );
  }
}

ButtonLoadMore.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
};

export default ButtonLoadMore;
