import React from 'react';
import PropTypes from 'prop-types';

const ErrorGeneralHeader = (props) => {
  if (!props.withOnCloseButton) return null;

  return (
     <div className="message-header">
      <p>Error</p>
      <button 
        className="delete is-small" 
        aria-label="delete" 
        onClick={props.onClickClose}>
      </button>
    </div>
  )
}
const ErrorGeneralMessage = props => <article 
  className="message is-danger"
> 
  <ErrorGeneralHeader
    withOnCloseButton={props.withOnCloseButton}
    onClickClose={props.onClickClose}
  />
  <div className="message-body">
    <span className="is-danger">{props.errorMessage}</span>
  </div>
</article>;

ErrorGeneralMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onClickClose: PropTypes.func,
  withOnCloseButton: PropTypes.bool,
};

ErrorGeneralMessage.defaultProps = {
  withOnCloseButton: false,
};

export default ErrorGeneralMessage;
