import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './login/Form';
import ErrorMessage from './components/ErrorMessage';

const mapStateToProps = (state) => {
  const login = state.ui.login;

  return {
    isFetching: login.get('isFetching'),
    fetched: login.get('fetched'),
    fetchError: login.get('fetchError'),
    errorMessage: login.get('errorMessage'),
  };
}

class Login extends PureComponent {
  render() {
    const fetchError = this.props.fetchError;

    return (
      <Fragment>
        {
          fetchError && 
          <ErrorMessage errorMessage={this.props.errorMessage} />
        }
        <Form isFetching={this.props.isFetching} />
      </Fragment>
    );
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps)(Login);
