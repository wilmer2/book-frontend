import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SideBar from './SideBar';
import Page from './Page';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import ButtonReload from '@/app/components/ui/ButtonReload';

const PageItem = (props) => {
  if (props.pageId) return <Page pageId={props.pageId} />;

  return (
    <div className="box">
      <div className="column is-centered">
        <h4 className="title">
          Selecciona página
        </h4>
      </div>
    </div>
  );
}

const StoryView = (props) => {
  const { pageUI } = props;

  const currentPage = pageUI.getIn(['pagination', 'currentPage']);
  const totalPages = pageUI.getIn(['pagination', 'totalPages']);
  const fetchError = pageUI.get('fetchError');
  const errorMessage = pageUI.get('errorMessage');
  const isFetching = pageUI.get('isFetching');

  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <SideBar 
          book={props.book}
          pages={props.pages}
          onLoadMore={props.onLoadMore}
          isFetching={isFetching}
          fetchError={fetchError}
          errorMessage={errorMessage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <div className="container">
        <div className="column">
          <PageItem pageId={props.pageId} />
        </div>
      </div>
    </div>
  );
} 

class Story extends PureComponent {
  componentDidMount() {
    this.handleGetBook();
  }

  componentWillUnmount() {
    this.props.resetPagination();
  }

  handleLoadMore = (page) => {
    const { bookId } = this.props;
    
    this.props.getPages({ page, bookId });
  }

  handleGetBook = () => {
    const { bookId } = this.props;

    this.props.getBook({ id: bookId });
  }

  render() {
    const { fetched, isFetching, fetchError } = this.props;

    return (
      <Fragment>
        {isFetching && <MediumSpinner />}
        {fetchError && <ButtonReload onClickFunc={this.handleGetBook} />}
        {fetched && <StoryView 
          book={this.props.book}
          pages={this.props.pages}
          pageId={this.props.pageId}
          pageUI={this.props.pageUI}
          onLoadMore={this.handleLoadMore}
        />}
      </Fragment>
    );
  }
}

Story.propTypes = {
  bookId: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired,
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  getBook: PropTypes.func.isRequired,
  pageId: PropTypes.string,
  pages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  pageUI: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }),
  getPages: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
};

export default Story;
