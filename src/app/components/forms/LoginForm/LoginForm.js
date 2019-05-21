import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import loginSchema from '@/validationSchemas/loginSchema';
import { Formik, Form } from 'formik';
import LoginFields from './LoginFields';
import LoginButtons from './LoginButtons';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';

class LoginForm extends PureComponent {
  handleOnSubmit = (values, actions) => {
    this.props.onSubmitLogin({ values, actions });
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
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onSubmitLogin: PropTypes.func.isRequired,
};

export default LoginForm;
