import axios from 'axios';
import _ from 'lodash';
import { fromJS } from 'immutable';
import { UNPROCESSABLE_ENTITY, SERVER_ERRORS, NOT_FOUND } from './statusCodes';
import { 
  serverErrorMessage, 
  timeoutMessage, 
  requestFailedMessage,
  notFoundMessage 
} from './messages';

const BASE_URL = 'http://book.com/v1/';
const TIMEOUT = 30000;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';
const ECONNABORTED = 'ECONNABORTED';


const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});


const passToken = token => axiosClient.defaults.headers.common['Authorization'] = `Bearer token`;
const removeToken = () => axiosClient.defaults.headers.common['Authorization'] = ''; 


const handleError = (code, { status, data: { message, errors } }) => {
  let errorResponse = message;

  if (code === ECONNABORTED) {
    errorResponse = timeoutMessage;
  } else if(_.isEqual(status, UNPROCESSABLE_ENTITY)) {
    errorResponse = fromJS(errors);
  } else if (status >= SERVER_ERRORS) {
    errorResponse = serverErrorMessage;
  } else if (_.isEqual(status, NOT_FOUND)) {
    errorResponse = notFoundMessage;
  }

  return errorResponse;
}

axiosClient.defaults.headers.post['Content-type'] = CONTENT_TYPE;
axiosClient.defaults.headers.put['Content-type'] = CONTENT_TYPE;
axiosClient.defaults.headers.patch['Content-type'] = CONTENT_TYPE;

axiosClient.interceptors.response.use(response => response, (error) => {
  const { response, request, code } = error;
  let errors;

  if (response) {
    errors = handleError(code, response);
  } else if (request) {
    errors = requestFailedMessage;
  }

  return Promise.reject({ errors });
});

const get = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.get(...args)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

const post = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.post(...args)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

const bookClient = {
  get,
  post,
  passToken,
  removeToken,
};

export default bookClient;
