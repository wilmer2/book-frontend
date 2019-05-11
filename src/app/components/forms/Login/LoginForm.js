import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { Link, withRouter } from 'react-router-dom';
import { loginPending } from '@/store/Login';
import loginSchema from '@/validationSchemas/loginSchema';
import { Formik, Form } from 'formik';
import LoginFields from './LoginFields';
import LoginButtons from './LoginButtons';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';

const mapStateToProps = (state) => {
  const loginUI = state.ui.login;

  return {
    isFetching: loginUI.get('isFetching'),
    fetched: loginUI.get('fetched'),
    fetchError: loginUI.get('fetchError'),
    errorMessage: loginUI.get('errorMessage'),
  };
}

const mapDispatchToProps = dispatch => ({
  submitLogin(loginData) {
    dispatch(loginPending(loginData));
  },
});

class LoginForm extends PureComponent {
  componentDidUpdate() {
    const { location : { pathname }, fetched } = this.props;
    
    if (isEqual(pathname, '/register') && fetched)
      this.props.history.push('/');
  }
  
  handleOnSubmit = (values, actions) => {
    this.props.submitLogin({ values, actions });
  }

  render() {
    const { fetchError, isFetching, errorMessage } = this.props;

    const initialValues = {
      email: '',
      password: '',
    };

    return (
      <Fragment>
        {fetchError && !isEmpty(errorMessage) && <ErrorGeneralMessage 
          errorMessage={errorMessage} 
        />}
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={this.handleOnSubmit}
        >
          <Form>
            <div className="column">
              <h2 className="title is-3">Ingresar</h2>
            </div>
            <LoginFields />
            <LoginButtons isFetching={isFetching} />
          </Form>
        </Formik>
        <div className="column">
          <Link to="/about">Olvidaste tu contraseña?</Link>            
        </div>
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  submitLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
