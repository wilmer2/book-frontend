import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import MySelect from '@/app/components/inputs/MySelect';
import ErrorFieldMessage from '@/app/components/ui/ErrorFieldMessage';

class UserFields extends PureComponent { 
  render() {
    const { categories } = this.props;
    
    const options = categories.map(category => ({ value: category.id, label: category.name }));

    return (
      <div className="column">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <Field className="input" type="email" name="email" />
          </div>
          <ErrorMessage name="email" component={ErrorFieldMessage} />
        </div>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <Field className="input" type="text" name="name" />
          </div>
          <ErrorMessage name="name" component={ErrorFieldMessage} />
        </div>
        <div className="field">
          <label className="label">Categorías</label>
          <div className="control">
            <Field name="categoriesIds" render={({ field, form }) => (
              <MySelect 
                name={field.name}
                value={field.value}
                options={options}
                onBlur={form.setFieldTouched}
                onChange={form.setFieldValue}
                multiple={true}
              />
            )}/>           
          </div>
          <ErrorMessage name="categoriesIds" component={ErrorFieldMessage} />
        </div>
        <div className="field">
          <label className="label">Contraseña</label>
          <div className="control">
            <Field className="input" type="password" name="password" />
          </div>
          <ErrorMessage name="password" component={ErrorFieldMessage} />
        </div>
      </div>
    );
  }
}

UserFields.propTypes = {
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
};

export default UserFields;
