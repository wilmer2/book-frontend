import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 9px;
  margin-left: 10px;
  width: 600px;

  @media (max-width: 992px) {
    margin-left: 0;
    width: 100%; 
  }
`;

const SearchField = (props) => {
  return (
    <Wrapper className="field">
      <div className="control">
        <input 
          className="input is-primary" 
          type="text" 
          placeholder="Buscar historias y personas" 
        />
      </div>
    </Wrapper>
  );
}

export default SearchField;
