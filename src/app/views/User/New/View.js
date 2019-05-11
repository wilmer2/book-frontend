import React, { PureComponent  } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { storeUserPending, storeUserReset } from '@/store/User';
import onlyGuessUser from '@/app/components/wrappers/OnyGuessUserEnhancer';
import UserForm from '@/app/components/forms/UserForm';

const mapStateToProps = (state) => {
  const userUI = state.ui.user.get('store');

  return {
    userUI,
  };
}

const mapDispatchToProps = (dispatch) => ({
  storeUser(userData) {
    dispatch(storeUserPending(userData));
  },

  resetStoreUser() {
    dispatch(storeUserReset());
  },
});

class View extends PureComponent {
  componentWillUnmount() {
    this.props.resetStoreUser();
  }
  
  render() {
    return (
      <div className="columns is-centered">
        <UserForm
          title="Registrarse" 
          userUI={this.props.userUI} 
          onSubmitUser={this.props.storeUser}
        />
      </div>
    );
  }
}

View.propTypes = {
  userUI: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }),
  storeUser: PropTypes.func.isRequired,
  resetStoreUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(onlyGuessUser(View));
