import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SideBarItem from './SideBarItem';
import ButtonLoadMore from '@/app/components/ui/ButtonLoadMore';

class SideBar extends PureComponent {
  render() {
    return (
      <aside className="menu">
        <p className="menu-label">
          Páginas
        </p>
        <ul className="menu-list">
          {this.props.pages.map(page => <SideBarItem 
            key={page.id}
            page={page}
          />)}
        </ul>
        <p className="menu-label">
          <ButtonLoadMore 
            isFetching={this.props.isFetching}
            totalPages={this.props.totalPages}
            currentPage={this.props.currentPage}
            onClickLoadMore={this.props.onClickLoadMore}
          />
        </p>
      </aside>
    );
  }
}

SideBar.propTypes = {
  pages: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
};

export default SideBar;
