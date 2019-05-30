import BookClient from './BookClient';
import humps from 'humps';
import omit from 'lodash/omit';

const login = (data) => {
  return new Promise((resolve, reject) => {
    const url = 'clients/web/admin/login';

    return BookClient.post(url, data)
      .then(response => resolve(response.data))
      .catch(reject)
  });
}

const getAuthenticatedUser = (params) => {
  return new Promise((resolve, reject) => {
    const url = 'user/profile';

    return BookClient.get(url, { params })
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

const getBooks = (params) => {
  return new Promise((resolve, reject) => {
    const url = 'books';

    return BookClient.get(url, { params })
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const storeUser = (data) => {
  return new Promise((resolve, reject) => {
    const url = 'register';

    return BookClient.post(url, humps.decamelizeKeys(data))
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const editUser = (data, id) => {
  return new Promise((resolve, reject) => {
    const url = `users/${id}`;

    return BookClient.patch(url, humps.decamelizeKeys(data))
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const refreshToken = (data) => {
  return new Promise((resolve, reject) => {
    const url = 'clients/web/admin/refresh';

    return BookClient.post(url, humps.decamelizeKeys(data))
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

const storeItem = (key, value) => localStorage.setItem(key, value);
const removeItem = key => localStorage.removeItem(key);

const storeToken = (accessToken, refreshToken) => {
  storeItem('token', accessToken);
  storeItem('refreshToken', refreshToken);
   
  BookClient.passToken(accessToken);
}

const clearToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  BookClient.removeToken();
}

const BookApi = {
  login,
  storeItem,
  removeItem,
  storeToken,
  clearToken,
  refreshToken,
  getPages,
  getPageById,
  getAuthenticatedUser,
  getBooksToHome,
  getBookById,
  getBooks,
  getCategories,
  storeUser,
  editUser,
};

export default BookApi;
