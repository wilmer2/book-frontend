import React from 'react';
import PropTypes from 'prop-types';

const SuccessMessage = props => <div 
  className="column"
>
  <article className="message is-primary">
    <div className="message-body">
      {props.message}
    </div>
  </article>
</div>;

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessMessage;
