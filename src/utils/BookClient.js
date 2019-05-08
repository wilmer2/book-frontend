import axios from 'axios';

const BASE_URL = 'http://book.com/v1/';
const TIMEOUT = 30000;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';

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

const passToken = token => axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const removeToken = () => axiosClient.defaults.headers.common['Authorization'] = ''; 

/*const handleError = (code, { status, data: { message, errors } }) => {
  let errorResponse = message;

  if (code === ECONNABORTED) {
    errorResponse = timeoutMessage;
  } else if(isEqual(status, UNPROCESSABLE_ENTITY)) {
    errorResponse = fromJS(errors);
  } else if (status >= SERVER_ERRORS) {
    errorResponse = serverErrorMessage;
  } else if (isEqual(status, NOT_FOUND)) {
    errorResponse = notFoundMessage;
  }

  return errorResponse;
}


axiosClient.interceptors.response.use(response => response, (error) => {
  const { response, request, code } = error;
  let errors;

  if (response) {
    errors = handleError(code, response);
  } else if (request) {
    errors = requestFailedMessage;
  }

  return Promise.reject({ errors });
});*/

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

const BookClient = {
  get,
  post,
  passToken,
  removeToken,
};

export default BookClient;
