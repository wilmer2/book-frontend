import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Navbar from './header/Navbar';
import { connect } from 'react-redux';

import { openLoginModal, closeLoginModal } from '../../store/Login';

const mapStateToProps = (state) => {
  const authenticatedUser = state.entities.get('authenticated');
  const openLoginModal = state.ui.login.get('openModal');

  return {
    authenticatedUser,
    openLoginModal,
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
  };
}

class Header extends Component {
  handleOnClickOpenLoginModal = (e) => {
    e.preventDefault();
    
    this.props.openModal();
  }

  handleOnCloseLoginModal = () => {
    this.props.closeModal();
  }

  render() {
    return (
      <Navbar 
        authenticatedUser={this.props.authenticatedUser} 
        openLoginModal={this.props.openLoginModal}
        onClickOpenLoginModal={this.handleOnClickOpenLoginModal}
        onCloseLoginModal={this.handleOnCloseLoginModal}
      />
    );
  }
}

Header.propTypes = {
  authenticatedUser: ImmutablePropTypes.map.isRequired,
  openLoginModal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
