import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeUserPending, resetStoreUser } from '@/store/User';
import onlyGuessUser from '@/app/components/wrappers/OnyGuessUserEnhancer';
import UserForm from '@/app/components/forms/UserForm';

const mapStateToProps = (state) => {
  const storeUI = state.ui.user.get('store');

  return {
    isFetching: storeUI.get('isFetching'),
    fetched: storeUI.get('fetched'),
    fetchError: storeUI.get('fetchError'),
    errorMessage: storeUI.get('errorMessage'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  storeUser(userData) {
    dispatch(storeUserPending(userData));
  },

  resetStoreUser() {
    dispatch(resetStoreUser());
  },
});

class View extends PureComponent {
  componentWillUnmount() {
    this.props.resetStoreUser();
  }
  
  render() {
    const { 
      isFetching, 
      fetched, 
      fetchError, 
      errorMessage 
    } = this.props;

    return (
      <UserForm
        title="Registrarse" 
        successMessage="Usuario registrado"
        fetched={fetched}
        isFetching={isFetching} 
        fetchError={fetchError}
        errorMessage={errorMessage}
        onSubmitUser={this.props.storeUser}
      />
    );
  }
}

View.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  storeUser: PropTypes.func.isRequired,
  resetStoreUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(onlyGuessUser(View));
