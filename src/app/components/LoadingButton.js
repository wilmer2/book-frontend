import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { buttonLoadMessage } from '../../utils/uiText';

class LoadingButton extends PureComponent {
  render() {
    const isFetching = this.props.isFetching;

    return (
      <button 
        className={`button ${ this.props.color } ${ this.props.size}`}
        disabled={ isFetching}
      >
        {isFetching ? buttonLoadMessage : this.props.text}
      </button>
    )
  }
}

LoadingButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  isFetching: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

LoadingButton.defaultProps = {
  size: 'is-normal',
  color: 'is-primary',
  isFetching: false,
};

export default LoadingButton;
