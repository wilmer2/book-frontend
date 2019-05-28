import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { toastr } from 'react-redux-toastr';
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { getCategoriesSelector } from '@/selectors/categoriesSelector';
import FormTitle from '@/app/components/forms/components/FormTitle';
import FormButton from '@/app/components/forms/components/FormButton';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';
import UserFields from './UserFields';

const mapStateToProps = (state) => {
  const categories = getCategoriesSelector(state);

  return {
    categories,
  };
}

class UserForm extends PureComponent {
  componentDidUpdate(prevProps) {
    const { fetched, successMessage } = this.props;

    if (fetched && !isEqual(prevProps.fetched, fetched))
      toastr.success(successMessage);
  }

  handleOnSubmit = (inputData, actions) => {
    const categoriesIds = inputData.categoriesIds.map(categoryId => categoryId.value);
    const values = { ...inputData, categoriesIds };
    
    this.props.onSubmitUser({ values, actions });
  }

  render() {
    const { 
      user, 
      categories, 
      title,
      isFetching,
      fetchError,
      errorMessage,
    } = this.props;

    let categoriesIds = [];

    if (!isEmpty(user)) {
      categoriesIds = user.preferences.map(category => ({ value: category.id, label: category.name }));
    }

    const initialValues = merge({ 
      email: '',
      password: '',
      name: '',
      categoriesIds,
    }, user);

    return (
      <Fragment>
        {fetchError && !isEmpty(errorMessage) && <div className="column">
          <ErrorGeneralMessage errorMessage={errorMessage}/>
        </div>}
        <Formik 
          initialValues={initialValues}
          onSubmit={this.handleOnSubmit}
        >
          <div className="columns is-centered">
            <Form className="column is-5">
              <FormTitle title={title} />
              <UserFields categories={categories} />
              <div className="column">
                <FormButton 
                  text="Guardar" 
                  isFetching={isFetching}
                />
              </div>
            </Form>
          </div>
        </Formik>
      </Fragment>
    );
  }
}

UserForm.propTypes = {
  title: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  onSubmitUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

UserForm.defaultProps = {
  user: {},
};

export default  connect(mapStateToProps)(UserForm);
