import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom';
import loginSchema from '@/validationSchemas/loginSchema';
import { Formik, Form } from 'formik';
import LoginFields from './LoginFields';
import LoginButtons from './LoginButtons';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';
import FormTitle from '@/app/components/forms/components/FormTitle';

const WrapperMessageError = styled.div`
  max-width: 360px;
  margin-top: 20px;
`;

class LoginForm extends PureComponent {
  state = {
    showError: false,
  }

  componentDidUpdate(prevProps) {
    const { fetchError } = this.props;

    if (fetchError && !isEqual(prevProps.fetchError, fetchError))
      this.setState({ showError: true });
  }

  checkLoginState = (response) => {
    const { accessToken } = response;

    this.props.socialAuthLogin({ oauthToken: accessToken });
  }

  handleOnSubmit = (values, actions) => {
    this.props.onSubmitLogin({ values, actions });
  }

  render() {
    const { isFetching, errorMessage, fbIsFetching } = this.props;
    const { showError } = this.state;

    const initialValues = {
      email: '',
      password: '',
    };

    return (
      <Fragment>
        {showError && !isEmpty(errorMessage) && <WrapperMessageError>
          <ErrorGeneralMessage 
            errorMessage={errorMessage} 
          />
        </WrapperMessageError>}
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={this.handleOnSubmit}
          validateOnBlur={false}
          render={({ resetForm }) =>(
            <Form>
              <FormTitle title="Ingresar" />
              <LoginFields />
              <LoginButtons
                resetForm={resetForm} 
                isFetching={isFetching}
                fbIsFetching={fbIsFetching}
                checkLoginState={this.checkLoginState}  
              />
            </Form>
          )}
        />
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
  socialAuthLogin: PropTypes.func.isRequired,
  fbIsFetching: PropTypes.bool.isRequired,
};

export default LoginForm;
