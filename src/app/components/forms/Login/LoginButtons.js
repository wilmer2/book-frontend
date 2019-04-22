import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styted from 'styled-components';
import FormButton from '@/app/components/forms/components/FormButton';

const WrapperButtonFacebook = styted.div`
  margin-top: .8rem;
`;

class LoginButtons extends PureComponent {
  render() {
    return (
      <div className="column">
        <FormButton 
          text="Iniciar sesión" 
          isFetching={this.props.isFetching}
          size="is-fullwidth"
        />
        <WrapperButtonFacebook>
          <button 
            className="button is-link is-fullwidth" 
            disabled={this.props.isFetching}
            type="button"
          > 
            Iniciar con Facebook
          </button>
        </WrapperButtonFacebook>
      </div>
    );
  }
}

LoginButtons.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default LoginButtons;
