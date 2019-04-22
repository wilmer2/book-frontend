import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SideBarItem = props => <li>
  <Link>{props.page.title}</Link>
</li>

SideBarItem.propTypes = {
  page: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SideBarItem;
