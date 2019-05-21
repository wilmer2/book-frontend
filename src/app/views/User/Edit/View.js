import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUserPending, resetEditUser } from '@/store/User';
import { getAuthenticatedUserSelector } from '@/selectors/usersSelector';
import onlyAuthenticatedUser from '@/app/components/wrappers/OnlyAuthenticatedUserEnhancer';
import UserForm from '@/app/components/forms/UserForm';

const mapStateToProps = (state) => {
  const editUI = state.ui.user.get('edit');
  const authenticatedUser = getAuthenticatedUserSelector(state);

  return {
    isFetching: editUI.get('isFetching'),
    fetched: editUI.get('fetched'),
    fetchError: editUI.get('fetchError'),
    errorMessage: editUI.get('errorMessage'),
    authenticatedUser,
  };
}

const mapDispatchToProps = (dispatch) => ({
  editUser(userData) {
    dispatch(editUserPending(userData));
  },

  resetEditUser() {
    dispatch(resetEditUser());
  },
});

class View extends PureComponent {
  componentWillUnmount() {
    this.props.resetEditUser();
  }
  
  render() {
    const { 
      isFetching, 
      fetched, 
      fetchError, 
      errorMessage,
      authenticatedUser 
    } = this.props;

    return (
      <UserForm
        title="Editar"
        successMessage="Datos de usuario modificado"
        fetched={fetched}
        isFetching={isFetching} 
        fetchError={fetchError}
        errorMessage={errorMessage}
        onSubmitUser={this.props.editUser}
        user={authenticatedUser}
      />
    );
  }
}

View.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  authenticatedUser: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  resetEditUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(onlyAuthenticatedUser(View));
