import { UNPROCESSABLE_ENTITY, SERVER_CODE, NOT_FOUND } from './statusCodes';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';

import { 
  SERVER_ERROR_MESSAGE, 
  TIMEOUT_MESSAGE, 
  REQUEST_FAILED_MESSAGE,
  ECONNABORTED 
} from './messages';


const parseValidationError = (errors, errorKey) => {
  return errors[errorKey].reduce((errorValue, errorMessage, i) => {
    return i > 1 ? `${errorMessage}, ${errorValue}` : errorValue;
  });
}
const handleResponseError = (code, { status, data: { message, errors } }) => {
  if (status >= SERVER_CODE) {
    return SERVER_ERROR_MESSAGE;
  } else if(isEqual(ECONNABORTED, code)) {
    return TIMEOUT_MESSAGE;
  } else if (isEqual(status, NOT_FOUND)) {
    return NOT_FOUND;
  }

  if (isEqual(status, UNPROCESSABLE_ENTITY)) {
    return keys(errors).reduce((errorObj, errorKey) => ({
      ...errorObj,
      [errorKey]: parseValidationError(errors, errorKey),
    }), {});
  }

  return message;
}

const parseError = (errors) => {
  const { response, request, code } = errors;

  if (response) {
    return handleResponseError(code, response);
  } else if (request) {
    return REQUEST_FAILED_MESSAGE;
  }

  return errors.message;
}

export default parseError;
