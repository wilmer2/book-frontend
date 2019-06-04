import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormButton extends PureComponent {
  render() {
    const {
      isFetching,
      color,
      size,
      text,
      isDisabled
    } = this.props;

    return (
      <button 
        className={`button ${ color } ${ size } ${ isFetching && 'is-loading'}`}
        disabled={isDisabled}
        type="submit"
      >
        {text}
      </button>
    )
  }
}

FormButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  isFetching: PropTypes.bool,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

FormButton.defaultProps = {
  size: 'is-normal',
  color: 'is-primary',
  isFetching: false,
  isDisabled: false,
};

export default FormButton;
