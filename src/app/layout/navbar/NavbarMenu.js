import React, { PureComponent, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchField from './SearchField';
import Avatar from './Avatar';
import CategoryDropDown from './CategoryDropDown';
import NavbarButtons from './NavbarButtons';
import Modal from '../../components/Modal';
import Login from '../../Login';

class NavbarMenu extends PureComponent {
  renderAvatar() {
    const authenticatedFetched = this.props.authenticatedUserUi.get('fetched');
    const authenticatedIsFetching = this.props.authenticatedUserUi.get('isFetching');
    const authenticatedFetchedError = this.props.authenticatedUserUi.get('fetchError');

    if (authenticatedFetched || authenticatedIsFetching || authenticatedFetchedError) {
      return (
        <Avatar 
          authenticatedUser={this.props.authenticatedUser}
          authenticatedUserUi={this.props.authenticatedUserUi}
          onClickLogout={this.props.onClickLogout}
          onClickGetAuthenticatedUser={this.props.onClickGetAuthenticatedUser}
        />
      );
    } 

    return <NavbarButtons onClickOpenLoginModal={this.props.onClickOpenLoginModal} />;
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
            {this.renderAvatar()}
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
  authenticatedUserUi: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
  }).isRequired,
  onClickOpenLoginModal: PropTypes.func.isRequired,
  onCloseLoginModal: PropTypes.func.isRequired,
  openLoginModal: PropTypes.bool.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  onClickGetAuthenticatedUser: PropTypes.func.isRequired,
};

export default NavbarMenu;
