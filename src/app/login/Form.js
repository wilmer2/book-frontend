import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Fields from './Fields';
import LoginButtons from './LoginButtons';

class Form extends PureComponent {
  render() {
    return (
      <div className="columns">
        <form>
          <div className="column">
            <h2 className="title is-3">Login</h2>
          </div>
          <Fields />
          <LoginButtons isFetching={this.props.isFetching} />
          <div className="column">
            <Link to="/about">Olvidaste tu contraseña?</Link>            
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default Form;
