import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openLoginModal, closeLoginModal, loginPending } from '@/store/Login';
import Modal from '@/app/components/wrappers/Modal';
import LoginForm from '@/app/components/forms/LoginForm';

const mapStateToProps = (state) => {
  const loginUI = state.ui.login;

  return {
    openModal: loginUI.get('openModal'),
    isFetching: loginUI.get('isFetching'),
    fetched: loginUI.get('fetched'),
    fetchError: loginUI.get('fetchError'),
    errorMessage: loginUI.get('errorMessage'),
  };
}

const mapDispatchToProps = dispatch => ({
  openLoginModal() {
    dispatch(openLoginModal());
  },

  closeLoginModal() {
    dispatch(closeLoginModal());
  },

  submitLogin(loginData) {
    dispatch(loginPending(loginData));
  },
});


const showLoginModal = (WrappedComponent) => {
  class LoginModal extends PureComponent {
    componentDidUpdate() {
      const { location : { pathname }, fetched } = this.props;

      if (isEqual(pathname, '/register') && fetched)
        this.props.history.push('/');
    }

    handleOpenLoginModal = (e) => {
      e.preventDefault();

      this.props.openLoginModal();
    }

    handleOnCloseLoginModal = () => {
      const { isFetching } = this.props;

      if (!isFetching) this.props.closeLoginModal();
    }

    render() {
      const { 
        openModal, 
        isFetching,  
        fetchError,
        errorMessage, 
        ...passThroughProps 
      } = this.props;

      return (
        <Fragment>
          <Modal 
            onCloseModal={this.handleOnCloseLoginModal}
            open={openModal}
          >
            <LoginForm
              isFetching={isFetching} 
              fetchError={fetchError}
              errorMessage={errorMessage}
              onSubmitLogin={this.props.submitLogin}
            />
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
    fetched: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    openModal: PropTypes.bool.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
  };

  return LoginModal;
}

showLoginModal.propTypes = {
  WrappedComponent: PropTypes.element,
};

const enhanceComponent = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  showLoginModal
);

export default enhanceComponent;
