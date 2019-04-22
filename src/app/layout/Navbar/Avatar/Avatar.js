import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallSpinner from '@/app/components/ui/SmallSpinner';
import AvatarReloadButton from './AvatarReloadButton';
import AvatarDropDown from './AvatarDropDown';

class Avatar extends PureComponent {
  render() {
    const { fetched, isFetching, fetchError } = this.props;

    return (
      <Fragment>
        {isFetching && <SmallSpinner />}
        {fetchError && <AvatarReloadButton 
          onClickGetAuthenticated={this.props.onClickGetAuthenticatedUser}
        />}
        {fetched && <AvatarDropDown  
          authenticatedUser={this.props.authenticatedUser}
          onClickLogout={this.props.onClickLogout}
        />}
      </Fragment>
    );
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
