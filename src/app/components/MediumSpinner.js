import React from 'react';
import Loader from 'react-loader-spinner';

const MediumSpinner = () => {
  return (
    <div className="columns is-centered">
      <Loader 
        type="Oval"
        color="#00DAAF"
        height="100" 
        width="100"
      /> 
    </div>
  );
}

export default MediumSpinner;
