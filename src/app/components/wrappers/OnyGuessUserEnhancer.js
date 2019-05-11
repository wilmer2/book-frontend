import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshTokenPending } from '@/store/Login';
import MediumSpinner from '@/app/components/ui/MediumSpinner';

const mapStateToProps = (state) => {
  const refreshTokenUI = state.ui.login.get('refreshToken');

  return {
    refreshFetched: refreshTokenUI.get('fetched'),
    refreshIsFetching: refreshTokenUI.get('isFetching'),
  };
}

const mapDispatchToProps = dispatch => ({
  refreshToken(refreshTokenData) {
    dispatch(refreshTokenPending(refreshTokenData));
  },
});

const onlyGuessUser = WrappedComponent => {
  class OnlyGuessUserContainer extends PureComponent {
    componentDidMount() {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) 
        this.props.refreshToken({ refreshToken });
    }

    componentDidUpdate() {
      const { refreshFetched } = this.props;

      if (refreshFetched)
        this.props.history.push('/');
    }

    render() {
      const { 
        refreshIsFetching, 
        refreshFetched,
        ...passThroughProps
      } = this.props;

      return (
        <Fragment>
          {refreshIsFetching && <MediumSpinner />}
          {!refreshIsFetching && !refreshFetched && <WrappedComponent
            {...passThroughProps}
          />}
        </Fragment>
      );
    }
  }

  OnlyGuessUserContainer.propTypes = {
    refreshIsFetching: PropTypes.bool.isRequired,
    refreshFetched: PropTypes.bool.isRequired,
    refreshToken: PropTypes.func.isRequired,
  };

  return OnlyGuessUserContainer;
}

onlyGuessUser.propTypes = {
  WrappedComponent: PropTypes.element,
};

const enhanceComponent = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  onlyGuessUser
);

export default enhanceComponent;
