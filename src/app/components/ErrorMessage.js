import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  return (
    <article class="message is-danger">
      <div class="message-body">
        {props.errorMessage}
      </div>
    </article>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
