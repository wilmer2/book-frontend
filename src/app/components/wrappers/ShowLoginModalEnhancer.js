import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { openLoginModal, closeLoginModal } from '@/store/Login';
import Modal from '@/app/components/wrappers/Modal';
import Login from '@/app/components/forms/Login';

const mapStateToProps = (state) => {
  const loginUI = state.ui.login;

  return {
    loginUI,
  };
}

const mapDispatchToProps = dispatch => ({
  openLoginModal() {
    dispatch(openLoginModal());
  },

  closeLoginModal() {
    dispatch(closeLoginModal());
  },
});


const showLoginModal = (WrappedComponent) => {
  class LoginModal extends PureComponent {
    handleOpenLoginModal = (e) => {
      e.preventDefault();

      this.props.openLoginModal();
    }

    handleOnCloseLoginModal = () => {
      const { loginUI } = this.props;
      const isFetching = loginUI.get('isFetching');

      if (!isFetching) this.props.closeLoginModal();
    }

    render() {
      const { loginUI, ...passThroughProps } = this.props;
      const open = loginUI.get('openModal');

      return (
        <Fragment>
          <Modal 
            onCloseModal={this.handleOnCloseLoginModal}
            open={open}
          >
            <Login />
          </Modal>
          <WrappedComponent
            onClickOpenLoginModal={this.handleOpenLoginModal} 
             {...passThroughProps}
          />
        </Fragment>
      );
    }
  }

  LoginModal.propTypes = {
    loginUI: ImmutablePropTypes.mapContains({
      isFetching: PropTypes.bool.isRequired,
      openModal: PropTypes.bool.isRequired,
    }),
    openLoginModal: PropTypes.func.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
  };

  return LoginModal;
}

showLoginModal.propTypes = {
  WrappedComponent: PropTypes.element,
};

const enhanceComponent = compose(
  connect(mapStateToProps, mapDispatchToProps),
  showLoginModal
);

export default enhanceComponent;
