import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { Link } from 'react-router-dom';
import avatar from '@/images/avatar.png';

class Avatar extends PureComponent {
  render() {
    const { authenticatedUser } = this.props;

    return (
      <div className="navbar-item has-dropdown is-hoverable">
        {/* eslint-disable-next-line */}
        <a className="navbar-link">
          <figure className="image is-24x24">
            <Img 
              className="is-rounded"
              alt={authenticatedUser.name}
              src={[
                authenticatedUser.socialAvatar.avatar,
                avatar
              ]}
            />
          </figure>
          {authenticatedUser.name}
        </a>
        <div className="navbar-dropdown">
          <Link to="/profile/edit" className="navbar-item">
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

Avatar.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

export default Avatar;
