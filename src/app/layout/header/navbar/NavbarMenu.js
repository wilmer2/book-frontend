import React, { PureComponent } from 'react';
import ImmutableProtypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchField from './navbarMenu/SearchField';
import Avatar from './navbarMenu/Avatar';


class NavbarMenu extends PureComponent {
  renderAvatar = () => {
    const authenticatedUser = this.props.authenticatedUser;

    if (authenticatedUser.get('email')) {
      return <Avatar authenticatedUser={authenticatedUser} />
    }

    return (
      <div className="navbar-item">
        <div className="buttons">
          {/*eslint-disable-next-line*/}
          <a className="button is-primary is-inverted is-outlined" onClick={this.props.onClickOpenLoginModal}>
            Iniciar sesión
          </a>
          <Link to="about" className="button is-primary is-inverted">
            Registrarse
          </Link>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link to="/about" className="navbar-item">sing up</Link>
          <Link to="/about" className="navbar-item">About</Link>
          <Link to="/about" className="navbar-item">About</Link>
        </div>
        <div className="navbar-start">
          <SearchField />        
        </div>
        <div className="navbar-start">
          {this.renderAvatar()}
        </div>
      </div>
    );
  }
}

NavbarMenu.propTypes = {
  onClickOpenLoginModal: PropTypes.func.isRequired,
  authenticatedUser: ImmutableProtypes.mapContains({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
}

export default NavbarMenu;
