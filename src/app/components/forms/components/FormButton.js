import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormButton extends PureComponent {
  render() {
    const {
      isFetching,
      color,
      size,
      text
    } = this.props;

    return (
      <button 
        className={`button ${ color } ${ size } ${ isFetching && 'is-loading'}`}
        disabled={isFetching}
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
};

FormButton.defaultProps = {
  size: 'is-normal',
  color: 'is-primary',
  isFetching: false,
};

export default FormButton;
