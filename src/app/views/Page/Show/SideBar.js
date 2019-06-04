import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

const SideBarItems = (props) => {
  const { pages, book, fetched } = props;

  /* eslint-disable-next-line */
  if (!pages.length && fetched) return <a>No se han escrito páginas</a>;
  
  return pages.map(page => <Link
      key={page.id}     
      className="panel-block"
      to={`/book/${book.id}/story/${page.id}`} 
    >
      <span className="panel-icon">
        <i className="fas fa-book" aria-hidden="true"></i>
      </span>
      {page.title}
    </Link>
  );
}


const ButtonLoadMore = props => <div
  className="panel-block"
>
  {/* eslint-disable-next-line */} 
  <a
    className="button is-link is-outlined is-fullwidth" 
    onClick={props.onClickLoadMore} 
    disabled={props.isFetching}
  >
    Mostrar más
  </a>
</div>;


/* eslint-disable-next-line */
const ButtonError = props =><div 
  className="panel-block"
> 
  {/* eslint-disable-next-line */}
  <a 
    className="button is-link is-outlined is-fullwidth"
    onClick={props.onClickLoadMore}
    disabled={props.isFetching}
  >
    Volver a cargar
  </a>
</div>;

class SideBar extends PureComponent {
  componentDidUpdate(prevProps) {
    const { fetchError, errorMessage } = this.props;

    if (fetchError && !isEqual(prevProps.fetchError, fetchError)) 
      toastr.error(errorMessage);
  }

  handleOnClickLoadMore = (e) => {
    e.preventDefault();

    const { currentPage, fetchError } = this.props;
    const page = fetchError ? currentPage : currentPage + 1;

    this.props.onLoadMore(page);
  }

  shouldRenderLoadMore = () => {
    const { currentPage, totalPages } = this.props;

    return currentPage < totalPages;
  }

  render() {
    const { pages, book, isFetching, fetchError, fetched } = this.props;

    return (
      <nav className="panel">
        <p className="panel-heading">
          <Link to={`/book/${book.id}`}>
            {book.name}
          </Link>
        </p>
        <SideBarItems
          pages={pages}
          book={book}
          fetched={fetched}
        />
        {isFetching && <div 
            className="panel-block"
          > 
            <i className="fas fa-spinner fa-spin"></i>
        </div>}
        {fetchError && <ButtonError 
            onClickLoadMore={this.handleOnClickLoadMore}
            isFetching={isFetching} 
        />}
        {this.shouldRenderLoadMore() && <ButtonLoadMore 
            onClickLoadMore={this.handleOnClickLoadMore}
            isFetching={isFetching}
        />}
       
      </nav>
    );
  }
}

SideBar.propTypes = {
  book: PropTypes.object.isRequired,
  pages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onLoadMore: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default SideBar;
