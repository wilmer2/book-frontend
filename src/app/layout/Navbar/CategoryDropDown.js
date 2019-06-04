import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryDropDown = props => <div 
  className="navbar-item has-dropdown is-hoverable"
>
  {/* eslint-disable-next-line */}
  <a className="navbar-link">
    Categorías
  </a>
  <div className="navbar-dropdown">
    {props.categories.map(category => <Link
      key={category.id}
      to={`/category/${category.id}`}
      className="navbar-item"
    >
      {category.name}
    </Link>)}
  </div>
</div>;

CategoryDropDown.propTypes = {
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
};

export default CategoryDropDown;
