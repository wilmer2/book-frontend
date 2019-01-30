import React, { PureComponent, Fragment } from 'react';
import ImmutableProtypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import NavbarMenu from './navbar/NavbarMenu';
import NavbarBurger from './navbar/NavbarBurger';
import Logo from './navbar/Logo';
import Modal from '../../components/Modal';
import Login from '../../Login';

class Navbar extends PureComponent {
  render() {
    return(
      <Fragment>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Logo />  
            <NavbarBurger />
          </div>
          <NavbarMenu
            authenticatedUser={this.props.authenticatedUser}
            onClickOpenLoginModal={this.props.onClickOpenLoginModal} 
          />
        </nav>
        <Modal 
          onCloseModal={this.props.onCloseLoginModal}
          open={this.props.openLoginModal}
        >
          <Login />
        </Modal>
      </Fragment>
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
};

export default Navbar;
