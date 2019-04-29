import React from 'react';
import { FastField, ErrorMessage } from 'formik';
import ErrorFieldMessage from '@/app/components/ui/ErrorFieldMessage';

const LoginFields = () => <div 
  className="column"
>
  <div className="field">
    <p className="control has-icons-left has-icons-right">
      <FastField name="email" className="input" type="email" placeholder="Email" />
      <span className="icon is-small is-left">
        <i className="fas fa-envelope"></i>
      </span>
      <span className="icon is-small is-right">
        <i className="fas fa-check"></i>
      </span>
    </p>
    <ErrorMessage name="email" component={ErrorFieldMessage} />
  </div>
  <div className="field">
    <p className="control has-icons-left">
      <FastField name="password" className="input" type="password" placeholder="Contraseña" />
      <span className="icon is-small is-left">
        <i className="fas fa-lock"></i>
      </span>
    </p>
    <ErrorMessage name="password" component={ErrorFieldMessage} />
  </div>
</div>;

export default LoginFields;
