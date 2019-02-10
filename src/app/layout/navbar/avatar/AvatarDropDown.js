import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { Link } from 'react-router-dom';
import avatar from '../../../../images/avatar.png';

class AvatarDropDown extends PureComponent {
  render() {
    return(
      <div className="navbar-item has-dropdown is-hoverable">
        {/* eslint-disable-next-line */}
        <a className="navbar-link">
          <figure className="image is-24x24">
            <Img 
              className="is-rounded"
              alt={this.props.authenticatedUser.name}
              src={[
                this.props.authenticatedUser.socialAvatar.avatar,
                avatar
              ]}
            />
          </figure>
          {this.props.authenticatedUser.name}
        </a>
        <div className="navbar-dropdown">
          <Link to="/about" className="navbar-item">
            Mi Perfil
          </Link>
          <hr className="navbar-divider" />
          {/* eslint-disable-next-line */}
          <a className="navbar-item" onClick={this.props.onClickLogout} >
            Salir
          </a>
        </div>
      </div>
    );
  }
}

AvatarDropDown.propTypes = {
  onClickLogout: PropTypes.func.isRequired,
  authenticatedUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    socialAvatar: PropTypes.object.isRequired,
  }).isRequired,
};

export default AvatarDropDown;
