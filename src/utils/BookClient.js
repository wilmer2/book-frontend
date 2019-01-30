import axios from 'axios';
import { isEqual } from 'lodash';
import { UNPROCESSABLE_ENTITY, SERVER_ERRORS } from './statusCodes';
import { serverErrorMessage, timeoutMessage, requestFailedMessage } from './messages';

const BASE_URL = 'http://book.com/v1/';
const TIMEOUT = 5000;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';
const Econnaborted = 'ECONNABORTED';


const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});

axiosClient.defaults.headers.post['Content-type'] = CONTENT_TYPE;
axiosClient.defaults.headers.put['Content-type'] = CONTENT_TYPE;
axiosClient.defaults.headers.patch['Content-type'] = CONTENT_TYPE;


const handleErrorResponse = (code, { status, data: { message, errors } }) => {
  let errorResponse = message;

  if (code === ECONNABORTED) {
    errorResponse = timeoutMessage;
  } else if(isEqual(status, UNPROCESSABLE_ENTITY)) {
    errorResponse = fromJS(errors);
  } else if (status >= SERVER_ERRORS) {
    errorResponse = serverErrorMessage;
  }

  return errorResponse;
};

const handleError = ({ response, request, code }) => {
  let errors;

  if (response) {
    errors = handleErrorStatus(code, response);
  } else if (request) {
    errors = requestFailedMessage;
  }

  return Promise.reject({ errors });
};

const passToken = token => axiosClient.defaults.headers.common['Authorization'] = `Bearer token`;
const removeToken = () => axiosClient.defaults.headers.common['Authorization'] = ''; 

const get = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.get(..args)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

const post = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.post(...args)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

const bookClient = {
  get,
  post,
  passToken,
  removeToken,
};

export default bookClient;
