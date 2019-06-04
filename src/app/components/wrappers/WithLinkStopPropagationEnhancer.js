import React, { PureComponent } from 'react';

const withLinkStopPropagation = WrappedComponent => class extends PureComponent {
  handleOnClickLink = (e) => {
    e.stopPropagation();
  }

  render() {
    return (
      <WrappedComponent
        onClickLink={this.handleOnClickLink}
        {...this.props}
      />
    );
  }
}

export default withLinkStopPropagation;
