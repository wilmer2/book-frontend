import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshTokenStart } from '@/store/Login';
import { getCategoriesPending } from '@/store/Category';
import { getAuthenticatedUserSelector } from '@/selectors/usersSelector';
import { getCategoriesSelector } from '@/selectors/categoriesSelector';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import ButtonReload from '@/app/components/ui/ButtonReload';
import Navbar from './Navbar';
import Content from './Content';

const mapStateToProps = (state) => {
  const authenticatedUI = state.ui.authenticated;
  const categoryUI = state.ui.category;
  const authenticatedUser = getAuthenticatedUserSelector(state);
  const categories = getCategoriesSelector(state);
  const categoryFetched = categoryUI.get('fetched');
  const isFetching = categoryUI.get('isFetching') || authenticatedUI.get('isFetching');
  const fetchError = categoryUI.get('fetchError') || authenticatedUI.get('fetchError');
  const isRefreshToken = state.ui.login.get('isRefreshToken');

  return {
    authenticatedUser,
    categories,
    categoryFetched,
    isFetching,
    fetchError,
    isRefreshToken,
  };
}

const mapDispatchToProps = dispatch => ({
  refreshTokenStart(params) {
    dispatch(refreshTokenStart(params));
  },

  getCategories() {
    dispatch(getCategoriesPending());
  },
});

const LayoutLoader = () => <section className="section">
  <MediumSpinner />
</section>;

class Layout extends Component {
  componentDidMount() {
    this.loadInitialData(); 
  }

  componentDidUpdate() {
   if (this.shouldLoadInitialData())
      this.loadInitialData();
  }


  loadInitialData = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      this.props.refreshTokenStart({ refreshToken });
    }

    this.props.getCategories(); 
  }

  shouldLoadInitialData = () => {
     const {  categoryFetched, isFetching, fetchError, isRefreshToken } = this.props;

    return !categoryFetched && !isFetching && !fetchError && !isRefreshToken;
  }

  shouldRenderLoader = () => {
    const { isFetching, fetchError, isRefreshToken } = this.props;

    return (isFetching || isRefreshToken) && !fetchError;
  }

  shouldRendederContent = () => {
    const {  categoryFetched, isFetching, fetchError, isRefreshToken } = this.props;

    return categoryFetched && !isFetching && !fetchError && !isRefreshToken;
  }


  render() {
    const {  
      fetchError,
      authenticatedUser,
      categories 
    } = this.props;

    return (
      <Fragment>
        {this.shouldRenderLoader() && <LayoutLoader />}
        {fetchError && <ButtonReload 
          onClickFunc={this.loadInitialData} 
        />}
        {this.shouldRendederContent() && <Fragment>
          <Navbar 
            authenticatedUser={authenticatedUser} 
            categories={categories}
          />
          <Content />
        </Fragment>}
      </Fragment>
    );
  }
}

Layout.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  getCategories: PropTypes.func.isRequired,
  categoryFetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  isRefreshToken: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
