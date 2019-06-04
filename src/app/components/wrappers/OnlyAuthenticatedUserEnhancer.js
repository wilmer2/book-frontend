import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const onlyAuthenticatedUser = WrappedComponent => class extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) 
      this.props.history.push('/');
  }

  render() {
    return <WrappedComponent{...this.props}/>;
  }
}

onlyAuthenticatedUser.propTypes = {
  WrappedComponent: PropTypes.element,
};

const enhancer = compose(
  withRouter,
  onlyAuthenticatedUser
);

export default enhancer;
