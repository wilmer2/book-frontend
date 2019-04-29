import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import Avatar from './Avatar';
import CategoryDropDown from './CategoryDropDown';
import NavbarButtons from './NavbarButtons';
import Modal from '@/app/components/wrappers/Modal';
import Login from '@/app/components/forms/Login';

const AvatarMenu = (props) => {
  if (props.shouldRenderAvatar()) {
    return (
      <Avatar 
        authenticatedUser={props.authenticatedUser}
        fetched={props.fetched}
        fetchError={props.fetchError}
        isFetching={props.isFetching}
        onClickLogout={props.onClickLogout}
        onClickGetAuthenticatedUser={props.onClickGetAuthenticatedUser}
      />
    );
  }

  return <NavbarButtons onClickOpenLoginModal={props.onClickOpenLoginModal} />;
} 

class NavbarMenu extends PureComponent {
  shouldRenderAvatar = () =>  {
    const { fetched, isFetching, fetchError } = this.props;

    return fetched || isFetching || fetchError;
  }

  render() {
    return (
      <Fragment>
        <div className="navbar-menu is-active">
          <div className="navbar-start">
            <CategoryDropDown />
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/about" className="navbar-item">About</Link>
          </div>
          <div className="navbar-start">
            <SearchField />        
          </div>
          <div className="navbar-start">
            <AvatarMenu 
              authenticatedUser={this.props.authenticatedUser}
              fetched={this.props.fetched}
              fetchError={this.props.fetchError}
              isFetching={this.props.isFetching}
              onClickLogout={this.props.onClickLogout}
              onClickGetAuthenticatedUser={this.props.onClickGetAuthenticatedUser}
              onClickOpenLoginModal={this.props.onClickOpenLoginModal} 
              shouldRenderAvatar={this.shouldRenderAvatar}
            />
          </div>
        </div>
        <Modal 
          onCloseModal={this.props.onCloseLoginModal}
          open={this.props.openLoginModal}
        >
          <Login />
        </Modal>
      </Fragment>
    );
  }
}

NavbarMenu.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  onClickOpenLoginModal: PropTypes.func.isRequired,
  onCloseLoginModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.bool.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  onClickGetAuthenticatedUser: PropTypes.func.isRequired,
};

export default NavbarMenu;
