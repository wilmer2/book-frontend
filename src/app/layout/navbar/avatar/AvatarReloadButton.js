import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AvatarReloadButton = (props) => {
  return (
    <Fragment>
      {/* eslint-disable-next-line */}
      <a className="navbar-item" onClick={props.onClickGetAuthenticated}>
        <i className="fas fa-sync-alt fa-fw"></i>
        volver a cargar usuario
      </a>
    </Fragment>
  );
}

AvatarReloadButton.propTypes = {
  onClickGetAuthenticated: PropTypes.func.isRequired,
};

export default AvatarReloadButton;
