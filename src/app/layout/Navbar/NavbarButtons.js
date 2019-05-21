import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import showLoginModal from '@/app/components/wrappers/ShowLoginModalEnhancer';

const NavbarButtons = props => <div 
  className="navbar-item"
>
  <div className="buttons">
    {/*eslint-disable-next-line*/}
    <a className="button is-primary is-inverted is-outlined" onClick={props.onClickOpenLoginModal}>
      Iniciar sesión
    </a>
    <Link to="/register" className="button is-primary is-inverted">
      Registrarse
    </Link>
  </div>
</div>;

NavbarButtons.propTypes = {
  onClickOpenLoginModal: PropTypes.func.isRequired,
};

export default showLoginModal(NavbarButtons);
