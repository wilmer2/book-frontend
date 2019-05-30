import axios from 'axios';
import humps from 'humps';

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
  transformResponse: [
    data => humps.camelizeKeys(data),
  ],
});

axiosClient.defaults.headers.post['Content-type'] = CONTENT_TYPE;
axiosClient.defaults.headers.put['Content-type'] = CONTENT_TYPE;
axiosClient.defaults.headers.patch['Content-type'] = CONTENT_TYPE;

const passToken = token => axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const removeToken = () => axiosClient.defaults.headers.common['Authorization'] = ''; 

const get = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.get(...args)
      .then(response => resolve(response))
      .catch(reject);
  });
}

const post = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.post(...args)
      .then(response => resolve(response))
      .catch(reject);
  });
}

const patch = (...args) => {
  return new Promise((resolve, reject) => {
    axiosClient.patch(...args)
      .then(response => resolve(response))
      .catch(reject);
  });
}

const BookClient = {
  get,
  post,
  patch,
  passToken,
  removeToken,
};

export default BookClient;
