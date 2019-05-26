import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

class SearchField extends Component {
  handleOnSubmit = (e) => {
    e.preventDefault();

    const search = this.refs.searchInput.value;

    if (!search) return;

    this.props.history.push({
      pathname: '/results',
      search: `?search=${search}`,
    });
  }

  render() {
    return (
      <Wrapper className="field">
        <div className="control">
          <form onSubmit={this.handleOnSubmit}>
            <input
              ref="searchInput" 
              className="input is-primary" 
              type="text" 
              placeholder="Buscar historias y personas" 
            />
          </form>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(SearchField);
