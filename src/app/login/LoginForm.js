import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginSchema } from '../../validationSchemas';

import LoginFields from './LoginFields';
import LoginButtons from './LoginButtons';

class LoginForm extends PureComponent {
  handleSubmit = (values, actions) => {
    this.props.onSubmitLogin(values);
  }

  render() {
    const initialValues = {
      email: '',
      password: '',
    };

    return (
      <Fragment>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          <Form>
            <div className="column">
              <h2 className="title is-3">Ingresar</h2>
            </div>
            <LoginFields />
            <LoginButtons isFetching={this.props.isFetching} />
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
  onSubmitLogin: PropTypes.func.isRequired,
};

export default LoginForm;
