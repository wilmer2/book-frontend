import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

class View extends Component {
  render() {
    const { location: { search }, history } = this.props;

    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <BookList search={search} history={history} />
          </div>
        </div>
      </div>
    );
  }
}

View.propTypes = {
  location: PropTypes.object.isRequired,
};

export default View;
