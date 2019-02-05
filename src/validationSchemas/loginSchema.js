import * as Yup  from 'yup';
import { validationMessages } from  '../utils/messages';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.email('email'))
    .required(validationMessages.required('email' )),

  password: Yup.string()
    .required(validationMessages.required('constraseña')),
});

export default loginSchema;
