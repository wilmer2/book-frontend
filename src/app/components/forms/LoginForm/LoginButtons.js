import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styted from 'styled-components';
import FormButton from '@/app/components/forms/components/FormButton';
import FacebookLogin from 'react-facebook-login';

const WrapperButtonFacebook = styted.div`
  margin-top: .8rem;
`;

class LoginButtons extends PureComponent {
  handleCallbackFacebook = (response) => {
    this.props.resetForm();
    this.props.checkLoginState(response);
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div className="column">
        <FormButton 
          text="Iniciar sesión" 
          isFetching={isFetching}
          size="is-fullwidth"
        />
        <WrapperButtonFacebook>
          <FacebookLogin
            appId="825812604465886"
            autoLoad={false}
            fields="email"
            scope="public_profile, email"
            cssClass={`button is-link is-fullwidth  ${ isFetching && 'is-loading'}`}
            callback={this.handleCallbackFacebook}
            isDisabled={isFetching} 
          />
        </WrapperButtonFacebook>
      </div>
    );
  }
}

LoginButtons.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  checkLoginState: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default LoginButtons;
