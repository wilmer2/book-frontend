import React from 'react';
import PropTypes from 'prop-types';

const ButtonReload = (props) => {
  return (
    <div className="columns is-centered">
      <div className="column">
        <span>Algo salió mal</span>
      </div>
      <button className="button is-rounded" onClick={props.onClickFunc}>
        <i class="fas fa-redo-alt"></i> Intentar de nuevo
      </button>
    </div>
  );
}

ButtonReload.propTypes = {
  onClickFunc: PropTypes.func.isRequired,
};

export default ButtonReload;
