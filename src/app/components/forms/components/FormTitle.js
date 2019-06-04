import React from 'react';
import PropTypes from 'prop-types';

const FormTitle = props => <div 
  className="column"
>
  <h1 className="title">{props.title}</h1>
</div>;

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FormTitle;
