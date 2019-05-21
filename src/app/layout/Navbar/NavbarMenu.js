import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import SearchField from './SearchField';
import Avatar from './Avatar';
import CategoryDropDown from './CategoryDropDown';
import NavbarButtons from './NavbarButtons';

const AvatarMenu = (props) => {
  const { authenticatedUser } = props;

  if (!isEmpty(authenticatedUser)) {
    return (
      <Avatar 
        authenticatedUser={authenticatedUser}
        onClickLogout={props.onClickLogout}
      />
    );
  }

  return <NavbarButtons />;
} 

class NavbarMenu extends PureComponent {
  render() {
    const { authenticatedUser, categories } = this.props;

    return (
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <CategoryDropDown categories={categories} />
        </div>
        <div className="navbar-start">
          <SearchField />        
        </div>
        <div className="navbar-start">
          <AvatarMenu 
            authenticatedUser={authenticatedUser}
            onClickLogout={this.props.onClickLogout}
          />
        </div>
      </div>
    );
  }
}

NavbarMenu.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

export default NavbarMenu;
