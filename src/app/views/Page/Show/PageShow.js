import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import PageItem from './PageItem';

class PageShow extends PureComponent {
  componentDidMount() {
    this.handleLoadMore(this.props.currentPage);
  }

  handleLoadMore = (page) => {
    this.props.getPages({ page });
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="is-one-third">
            <SideBar
              pages={this.props.pages} 
              isRequired={this.props.isFetching}
              fetchedError={this.props.fetchedError}
              currentPage={this.props.currentPage}
              totalPages={this.props.totalPages}
              onClickLoadMore={this.handleLoadMore}
            />
          </div>
          <div className="column">
            <PageItem pageId={this.props.pageId} />
          </div>
        </div>
      </div>
    );
  }
}

PageShow.propTypes = {
  pages: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchedError: PropTypes.bool.isRequired,
  getPages: PropTypes.func.isRequired,
};

export default PageShow;
