import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SmallSpinner from '@/app/components/ui/SmallSpinner';
import { Link } from 'react-router-dom';
import { getCategoriesPending } from '@/store/Category';
import { getCategoriesSelector } from '@/selectors/categoriesSelector';

const mapStateToProps = (state) => {
  const categoryUi = state.ui.category;
  const categories = getCategoriesSelector(state);

  return {
    fetched: categoryUi.get('fetched'),
    isFetching: categoryUi.get('isFetching'),
    fetchError: categoryUi.get('fetchError'),
    categories,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getCategories() {
    dispatch(getCategoriesPending());
  },
});

/* eslint-disable-next-line */
const ButtonReload = props => <a 
  className="navbar-item" 
  onClick={props.onClickReload}
>
  <i className="fas fa-redo-alt fa-fw"></i> 
  <span>
    Algo salió mal
  </span>
</a>;

class CategoryDropDown extends PureComponent {
  handleOnMouseEnter = () => {
    if (!this.props.isFetching && !this.props.fetched)
      this.props.getCategories();
  }

  handleOnClickGetCategories = (e) => {
    e.preventDefault();

    this.props.getCategories();
  }

  render() {
    const { isFetching, fetched, fetchError, categories } = this.props;

    return (
      <div className="navbar-item has-dropdown is-hoverable" onMouseEnter={this.handleOnMouseEnter}>
        {/* eslint-disable-next-line */}
        <a className="navbar-link">
          Categorías
        </a>
        <div className="navbar-dropdown">
          {isFetching && <SmallSpinner />}
          {fetchError && <ButtonReload onClickReload={this.handleOnClickGetCategories} />}
          {fetched && categories.map(category => <Link
              key={category.id}
              to="/about/{category.id}"
              className="navbar-item"
            >
              {category.name}
            </Link>
          )}
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
