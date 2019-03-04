/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SmallSpinner from '../../components/SmallSpinner';
import { Link } from 'react-router-dom';
import { getCategoriesPending } from '../../../store/Category';
import { categoriesSelector } from '../../../selectors';

const mapStateToProps = (state) => {
  const categoryUi = state.ui.category;
  const categories = categoriesSelector.getCategories(state);

  return {
    fetched: categoryUi.get('fetched'),
    isFetching: categoryUi.get('isFetching'),
    fetchError: categoryUi.get('fetchError'),
    categories,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories() {
      dispatch(getCategoriesPending());
    },
  }
}

class CategoryDropDown extends PureComponent {
  handleOnMouseEnter = () => {
    if (!this.props.isFetching && !this.props.fetched) {
      this.props.getCategories();
    }
  }

  handleOnClickGetCategories = (e) => {
    e.preventDefault();

    this.props.getCategories();
  }

  renderItems() {
    if (this.props.isFetching) {
      return (
        <a className="navbar-item">
          <SmallSpinner />
        </a>
      );
    }

    if (this.props.fetched) {
      return this.props.categories.map(category => (
          <Link key={category.id} to="/about/{category.id}" className="navbar-item">
            {category.name}
          </Link>
        )
      );
    }

    if (this.props.fetchError) {
      return (
        <a className="navbar-item" onClick={this.handleOnClickGetCategories}>
          <i className="fas fa-redo-alt fa-fw"></i> 
          <span>
            Algo salió mal
          </span>
        </a>
      );
    }
  }

  render() {
    return (
     <div className="navbar-item has-dropdown is-hoverable" onMouseEnter={this.handleOnMouseEnter}>
        <a className="navbar-link">
          Categorías
        </a>
        <div className="navbar-dropdown">
         {this.renderItems()}
        </div>
      </div>
    );
  }
}

CategoryDropDown.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropDown);
