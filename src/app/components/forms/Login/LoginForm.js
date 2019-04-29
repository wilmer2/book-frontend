import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import loginSchema from '@/validationSchemas/loginSchema';
import { loginPending } from '@/store/Login';

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
  handleOnSubmit = (values, actions) => {
    this.props.submitLogin(values);
  }

  render() {
    const { fetchError, isFetching, errorMessage } = this.props;

    const initialValues = {
      email: '',
      password: '',
    };

    return (
      <Fragment>
        {fetchError && <ErrorGeneralMessage errorMessage={errorMessage} />}
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
  isFetching: PropTypes.bool.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
