import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import NavbarMenu from './navbar/NavbarMenu';
import NavbarBurger from './navbar/NavbarBurger';
import BookApi from '../../utils/BookApi';
import { usersSelector } from '../../selectors';
import { connect } from 'react-redux';

import { getAuthenticatedUserPending } from '../../store/Authenticated';
import { openLoginModal, closeLoginModal, logout } from '../../store/Login';

const mapStateToProps = (state) => {
  const authenticatedUser = usersSelector.getAuthenticatedUser(state);
  const authenticatedUserUi = state.ui.authenticated;
  const openLoginModal = state.ui.login.get('openModal');
  const fechingLogin = state.ui.login.get('isFetching');

  return {
    authenticatedUser,
    authenticatedUserUi,
    openLoginModal,
    fechingLogin,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal() {
      dispatch(openLoginModal());
    },

    closeModal() {
      dispatch(closeLoginModal());
    },

    getAuthenticatedUser() {
      dispatch(getAuthenticatedUserPending());
    },

    logout() {
      dispatch(logout());
    },
  };
}

class Navbar extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      BookApi.storeToken(token);
      this.props.getAuthenticatedUser();
    }
  }

  handleOnClickOpenLoginModal = (e) => {
    e.preventDefault();
    
    this.props.openModal();
  }

  handleOnCloseLoginModal = () => {
    if (this.props.fechingLogin) {
      return;
    }

    this.props.closeModal();
  }

  handleOnClickLogout = (e) => {
    e.preventDefault();

    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          {/* eslint-disable-next-line */}
          <a className="navbar-item">
            <img 
              src="https://bulma.io/images/bulma-logo-white.png" 
              alt="icon" 
              width="112"
              height="28" 
            />
          </a>
          <NavbarBurger />
        </div>
        <NavbarMenu
          onClickOpenLoginModal={this.handleOnClickOpenLoginModal} 
          onCloseLoginModal={this.handleOnCloseLoginModal}
          onClickLogout={this.handleOnClickLogout}
          onClickGetAuthenticatedUser={this.props.getAuthenticatedUser}
          openLoginModal={this.props.openLoginModal}
          authenticatedUser={this.props.authenticatedUser}
          authenticatedUserUi={this.props.authenticatedUserUi}
        />
      </nav> 
    );
  }
}

Navbar.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  authenticatedUserUi: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
  }).isRequired,
  openLoginModal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fechingLogin: PropTypes.bool.isRequired,
  getAuthenticatedUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
