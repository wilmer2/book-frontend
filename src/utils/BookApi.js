import BookClient from './BookClient';
import omit from 'lodash/omit';

const login = (data) => {
  return new Promise((resolve, reject) => {
    const url = 'clients/web/admin/login';

    return BookClient.post(url, data)
      .then(response => resolve(response.data))
      .catch(reject)
  });
}

const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const url = 'user/profile';

    return BookClient.get(url)
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const url = 'categories';

    return BookClient.get(url)
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const getPages = (requestParams) => {
  return new Promise((resolve, reject) => {
    const url = `pages/by-book/${requestParams.bookId}`;
    const params = omit(requestParams, 'bookId');

    return BookClient.get(url, {
      params,
    })
    .then(response => resolve(response.data))
    .catch(reject);
  });
}

const getPageById = (requestParams) => {
  return new Promise((resolve, reject) => {
    const url = `pages/${requestParams.id}`;

    return BookClient.get(url)
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const getBooksToHome = (requestParams = null) => {
  return new Promise((resolve, reject) => {
    const url = '/';

    return BookClient.get(url, {
      params: requestParams,
    })
    .then(response => resolve(response.data))
    .catch(reject);
  });
}

const getBookById = (requestParams) => {
  return new Promise((resolve, reject) => {
    const url = `books/${requestParams.id}`;

    return BookClient.get(url)
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const storeItem = (key, value) => localStorage.setItem(key, value);
const removeItem = key => localStorage.removeItem(key);

const storeToken = (token) => {
  storeItem('token', token);
   
  BookClient.passToken(token);
}

const clearToken = () => {
  localStorage.removeItem('token');

  BookClient.removeToken();
}

const BookApi = {
  login,
  storeItem,
  removeItem,
  storeToken,
  clearToken,
  getPages,
  getPageById,
  getAuthenticatedUser,
  getBooksToHome,
  getBookById,
  getCategories,
};

export default BookApi;
