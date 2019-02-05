import React, { PureComponent } from 'react';
import ImmutableProtypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import NavbarMenu from './navbar/NavbarMenu';
import NavbarBurger from './navbar/NavbarBurger';
import Logo from './navbar/Logo';

class Navbar extends PureComponent {
  handleOnCloseModal = () => {
    if (this.props.fechingLogin) {
      return;
    }

    this.props.onCloseLoginModal();
  }

  render() {
    return(
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Logo />  
          <NavbarBurger />
        </div>
        <NavbarMenu
          authenticatedUser={this.props.authenticatedUser}
          onClickOpenLoginModal={this.props.onClickOpenLoginModal} 
          onCloseLoginModal={this.handleOnCloseModal}
          openLoginModal={this.props.openLoginModal}
        />
      </nav> 
    );
  }
}

Navbar.propTypes = {
  authenticatedUser: ImmutableProtypes.mapContains({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  openLoginModal: PropTypes.bool.isRequired,
  onClickOpenLoginModal: PropTypes.func.isRequired,
  onCloseLoginModal: PropTypes.func.isRequired,
  fechingLogin: PropTypes.bool.isRequired,
};

export default Navbar;
