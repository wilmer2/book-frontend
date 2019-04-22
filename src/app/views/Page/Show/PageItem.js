import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Img from 'react-image';
import { getPagesSelector } from '@/selectors/pagesSelector';
import { getPageByIdPending } from '@/store/Page';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import bookImage from '@/images/bookImage.jpeg';

const getPageId = state => state.ui.page.getIn(['byId', 'id']);

const mapStateToProps = (state, ownProps) => {
  const pageUI = state.ui.page;

  return {
    pageId: ownProps.pageId,
    page: getPagesSelector(state, getPageId),
    isFetching: pageUI.getIn(['byId', 'isFetching']),
    fetchError: pageUI.getIn(['byId', 'fetchError']),
    errorMessage: pageUI.getIn(['byId', 'errorMessage']),
  };
}

const mapDispatchToProps = dispatch => ({
  getPage(params) {
    dispatch(getPageByIdPending(params));
  },
});

class PageItem extends PureComponent {
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
    const { page, isFetching, fetchError, errorMessage } = this.props;

    if (isFetching) return <MediumSpinner />;

    if (fetchError) return <ErrorGeneralMessage errorMessage={errorMessage} />;

    return (
      <div className="box">
        <h1 className="title">
          {page.title}
        </h1>
        <div className="columns">
          {page.imageUrl && (
            <div className="column">
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
            </div>)}
          <div className="column">
            <p>
              {page.text}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

PageItem.propTypes = {
  fetchError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageItem);
