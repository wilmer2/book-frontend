import React from 'react';
import PropTypes from 'prop-types';

const ErrorGeneralMessage = (props) => {
  return (
    <article className="message is-danger">    
      <div className="message-body">
        <span className="is-danger">{props.errorMessage}</span>
      </div>
    </article>
  );
}

ErrorGeneralMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorGeneralMessage;
