import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';
import NavbarBurger from './NavbarBurger';
import { logout } from '@/store/Login';

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  },
});

class Navbar extends Component {
  handleOnClickLogout = (e) => {
    e.preventDefault();

    this.props.logout();
  }

  render() {
    const { authenticatedUser, categories } = this.props;

    return (
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img 
              src="https://bulma.io/images/bulma-logo-white.png" 
              alt="icon" 
              width="112"
              height="28" 
            />
          </Link>
          <NavbarBurger />
        </div>
        <NavbarMenu
          onClickLogout={this.handleOnClickLogout}
          authenticatedUser={authenticatedUser}
          categories={categories}
        />
      </nav> 
    );
  }
}

Navbar.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Navbar);
