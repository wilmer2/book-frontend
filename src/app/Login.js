import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './login/LoginForm';
import ErrorGeneralMessage from './components/ErrorGeneralMessage';
import { loginPending } from '../store/Login';

const mapStateToProps = (state) => {
  const login = state.ui.login;

  return {
    isFetching: login.get('isFetching'),
    fetched: login.get('fetched'),
    fetchError: login.get('fetchError'),
    errorMessage: login.get('errorMessage'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin(loginData) {
      dispatch(loginPending(loginData));
    }
  }
}

class Login extends PureComponent {
  render() {
    const fetchError = this.props.fetchError;

    return (
      <Fragment>
        {
          fetchError && 
          <ErrorGeneralMessage errorMessage={this.props.errorMessage} />
        }
        <LoginForm 
          isFetching={this.props.isFetching} 
          onSubmitLogin={this.props.submitLogin}
        />
      </Fragment>
    );
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  submitLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
