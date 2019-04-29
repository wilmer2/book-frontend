import React from 'react';
import PropTypes from 'prop-types';

const ErrorFieldMessage = props => <p className="help is-danger">
  <span className="is-danger">{props.children}</span>
</p>;  

ErrorFieldMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorFieldMessage;
