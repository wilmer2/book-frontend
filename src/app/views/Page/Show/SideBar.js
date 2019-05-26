import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

const SideBarItems = (props) => {
  const { pages, book, fetched } = props;

  if (!pages.length && fetched) return <li>No se han escrito páginas</li>;
  
  return pages.map(page => <li 
    key={page.id}>
      <Link     
        className="navbar-item"
        to={`/book/${book.id}/story/${page.id}`} 
      >
        {page.title}
      </Link>
    </li>
  );
}


/* eslint-disable-next-line */
const ButtonLoadMore = props => <a 
  onClick={props.onClickLoadMore} 
  disabled={props.isFetching}
>
  Mostrar más
</a>;

/* eslint-disable-next-line */
const ButtonError = props => <a
  onClick={props.onClickLoadMore}
  disabled={props.isFetching}
>
  Volver a cargar
</a>;

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
      <aside className="menu">
        <p className="menu-label">
          Libro
        </p>
        <ul className="menu-list">
          <li>
            <Link to={`/book/${book.id}`}>
              {book.name}
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          Páginas
        </p>
        <ul className="menu-list">
          <SideBarItems 
            pages={pages}
            book={book}
            fetched={fetched}
          />
        </ul>
        <p className="menu-label">
          {isFetching && <i className="fas fa-spinner fa-spin"></i>}
          {fetchError && <ButtonError 
            onClickLoadMore={this.handleOnClickLoadMore}
            isFetching={isFetching} 
          />}
          {this.shouldRenderLoadMore() && <ButtonLoadMore 
            onClickLoadMore={this.handleOnClickLoadMore}
            isFetching={isFetching}
          />}
        </p>
      </aside>
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
