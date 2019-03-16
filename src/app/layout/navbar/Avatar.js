import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SmallSpinner from '../../components/SmallSpinner';
import AvatarReloadButton from './avatar/AvatarReloadButton';
import AvatarDropDown from './avatar/AvatarDropDown';

class Avatar extends PureComponent {
  render() {
    const { fetched, isFetching, fetchError } = this.props;
    
    if (fetched) {
      return(
        <AvatarDropDown  
          authenticatedUser={this.props.authenticatedUser}
          onClickLogout={this.props.onClickLogout}
        />
      );
    }

    if (fetchError) {
      return (
        <AvatarReloadButton onClickGetAuthenticated={this.props.onClickGetAuthenticatedUser} />
      );
    }

    if (isFetching) {
      return <SmallSpinner />;
    }
  }
}

Avatar.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  onClickGetAuthenticatedUser: PropTypes.func.isRequired,
};

export default Avatar;
