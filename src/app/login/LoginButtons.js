import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styted from 'styled-components';
import LoadingButton from '../components/LoadingButton';
import { buttonLoginMessage } from '../../utils/uiText';

const size = 'is-fullwidth';

const WrapperButtonFacebook = styted.div`
  margin-top: .8rem;
`;


class LoginButtons extends PureComponent {
  render() {
    return (
      <div className="column">
        <LoadingButton 
          text={buttonLoginMessage} 
          isFetching={this.props.isFetching}
          size={size}
        />
        <WrapperButtonFacebook>
          <button className="button is-link is-fullwidth"> 
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
