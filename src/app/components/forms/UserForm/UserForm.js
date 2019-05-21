import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import { getCategoriesSelector } from '@/selectors/categoriesSelector';
import FormTitle from '@/app/components/forms/components/FormTitle';
import FormButton from '@/app/components/forms/components/FormButton';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';
import SuccessMessage from '@/app/components/ui/SuccessMessage';
import UserFields from './UserFields';

const mapStateToProps = (state) => {
  const categories = getCategoriesSelector(state);

  return {
    categories,
  };
}

const SuccessResponseMessage = props => <div
  className="column"
>
  <SuccessMessage message={props.successMessage} />
</div>;

const ErrorResponseMessage = props => <div
  className="column"
>
  <ErrorGeneralMessage message={props.errorMessage} />
</div>;

class UserForm extends PureComponent {
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
      fetched,
      isFetching,
      fetchError,
      errorMessage, 
      successMessage,
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
        {fetched && <SuccessResponseMessage successMessage={successMessage} />}
        {fetchError && !isEmpty(errorMessage) && <ErrorResponseMessage
          errorMessage={errorMessage}
        />}
        <Formik 
          initialValues={initialValues}
          onSubmit={this.handleOnSubmit}
        >
          <Form className="column">
            <FormTitle title={title} />
            <UserFields categories={categories} />
            <div className="column">
              <FormButton 
                text="Guardar" 
                isFetching={isFetching}
              />
            </div>
          </Form>
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
