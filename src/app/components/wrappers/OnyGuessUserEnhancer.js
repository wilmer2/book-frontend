import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const onlyGuessUser = WrappedComponent => class extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) 
      this.props.history.push('/');
  }

  render() {
    return <WrappedComponent{...this.props}/>;
  }
}

onlyGuessUser.propTypes = {
  WrappedComponent: PropTypes.element,
};

const enhancer = compose(
  withRouter,
  onlyGuessUser
);

export default enhancer;
