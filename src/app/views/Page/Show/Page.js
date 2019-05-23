import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import  { connect } from 'react-redux';
import Img from 'react-image';
import { getPageByIdPending } from '@/store/Page';
import { findPageSelector } from '@/selectors/pagesSelector';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import bookImage from '@/images/bookImage.jpeg';

const getPageId = state => state.ui.page.getIn(['byId', 'id']);

const mapStateToProps = (state) => {
  const pageUI = state.ui.page.get('byId');
  const page = findPageSelector(state, getPageId);

  return {
    page,
    fetched: pageUI.get('fetched'),
    isFetching: pageUI.get('isFetching'),
    fetchError: pageUI.get('fetchError'),
    errorMessage: pageUI.get('errorMessage'),
  };
}

const mapDispatchToProps = dispatch => ({
  getPage(params) {
    dispatch(getPageByIdPending(params));
  },
});

const Show = (props) => {
  const { page } = props;

  return (
    <div className="box">
      <h1 className="title">
        {page.title}
      </h1>
      <div className="columns">
        {page.imageUrl && <div 
          className="column"
        >
          <figure className="image is-128x128">
            <Img 
              className="is-rounded"
              alt={page.title}
              src={[
                page.imageUrl,
                bookImage,
              ]}
            />
          </figure>
        </div>}
        <div className="column">
          <p>
            {page.text}
          </p>
        </div>
      </div>
    </div>
  );

}

class Page extends PureComponent {
  componentDidMount() {
    this.handleGetPage();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.pageId, this.props.pageId)) this.handleGetPage();
  }

  handleGetPage = () => {
    const { pageId } = this.props;

    this.props.getPage({ id: pageId });
  }

  render() {
    const { 
      fetched,
      isFetching, 
      fetchError, 
      errorMessage, 
      page 
    } = this.props;

    return (
      <Fragment>
        {isFetching && <MediumSpinner />}
        {fetchError && <ErrorGeneralMessage errorMessage={errorMessage} />}
        {fetched && <Show page={page} />}
      </Fragment>
    );
  }
}

Page.propTypes = {
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  pageId: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
