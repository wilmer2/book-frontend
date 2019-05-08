import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import  { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import { getCategoriesSelector } from '@/selectors/categoriesSelector';
import { getCategoriesPending } from '@/store/Category';
import MediumSpinner from '@/app/components/ui/MediumSpinner';
import ButtonReload from '@/app/components/ui/ButtonReload';
import ErrorGeneralMessage from '@/app/components/ui/ErrorGeneralMessage';
import FormButton from '@/app/components/forms/components/FormButton';
import UserFields from './UserFields';

const mapStateToProps = (state, ownProps) => {
  const { user, userUI } = ownProps;
  const categoryUI = state.ui.category;
  const categories = getCategoriesSelector(state);

  return {
    categories,
    categoryUI,
    user,
    fetched: userUI.get('fetched'),
    fetchError: userUI.get('fetchError'),
    isFetching: userUI.get('isFetching'),
    errorMessage: userUI.get('errorMessage'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  getCategories() {
    dispatch(getCategoriesPending());
  },
});

const SuccessMessage = () => <div 
  className="column"
>
  <article className="message is-primary">
    <div className="message-body">
      Usuario ha sido registrado
    </div>
  </article>
</div>;

const UserFormTitle = props => <div 
  className="column"
>
  <h1 className="title">{props.title}</h1>
</div>;

class UserForm extends PureComponent {
  componentDidMount() {
    const { categoryUI } = this.props;

    if (!categoryUI.get('fetched')) this.props.getCategories();
  }

  handleOnSubmit = (inputData, actions) => {
    const categoriesIds = inputData.categories_ids.map(categoryId => categoryId.value);
    const values = { ...inputData, categories_ids: categoriesIds };
    
    this.props.onSubmitUser({ values, actions });
  }

  render() {
    const { 
      categories, 
      categoryUI, 
      title,
      user, 
      fetched,
      fetchError,
      errorMessage,
      isFetching 
    } = this.props;

    const categoriesIds = !isEmpty(user) ? user.preferences.map(category => category.id) : []; 

    const initialValues = merge({ 
      email: '',
      password: '',
      name: '',
      categories_ids: categoriesIds,
    }, user);

    return (
      <Fragment>
        {categoryUI.get('isFetching') && <MediumSpinner />}
        {categoryUI.get('fetchError') && <ButtonReload onClickFunc={this.props.getCategories} />}

        {categoryUI.get('fetched') && <Formik 
          initialValues={initialValues}
          onSubmit={this.handleOnSubmit}
        >
          <Form className="column">
            {fetched && <SuccessMessage />}
            {fetchError && !isEmpty(errorMessage) && <ErrorGeneralMessage 
              errorMessage={errorMessage}
            />}
            <UserFormTitle title={title} />
            <UserFields categories={categories} />
            <div className="column">
              <FormButton 
                text="Guardar" 
                isFetching={isFetching}
              />
            </div>
          </Form>
        </Formik>}
        
      </Fragment>
    );
  }
}

UserForm.propTypes = {
  categoryUI: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
  }),
  title: PropTypes.string.isRequired,
  fetched: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
  onSubmitUser: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  user: {},
};

export default  connect(mapStateToProps, mapDispatchToProps)(UserForm);
