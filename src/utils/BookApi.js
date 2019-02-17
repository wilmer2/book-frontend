import BookClient from './BookClient';
import isNull from 'lodash/isNull';

const login = (data) => {
  return new Promise((resolve, reject) => {
    const url = 'clients/web/admin/login';

    return BookClient.post(url, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch(reject)
  });
}

const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const url = 'user/profile';

    return BookClient.get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch(reject);
  });
}

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const url = 'categories';

    return BookClient.get(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch(reject);
  });
}

const getBooksToHome = (requestParams = null) => {
  return new Promise((resolve, reject) => {
    let params;

    if (!isNull(requestParams)) {
      params = requestParams;
    }

    const url = '/';

    return BookClient.get(url, {
      params,
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch(reject);
  });
}

const storeItem = (key, value) => {
  localStorage.setItem(key, value);
}

const removeItem = (key) => {
  localStorage.removeItem(key);
}

const storeToken = (token) => {
  storeItem('token', token);
   
  BookClient.passToken(token);
}

const clearToken = () => {
  localStorage.removeItem('token');

  BookClient.removeToken();
}

const bookApi = {
  login,
  storeItem,
  removeItem,
  storeToken,
  clearToken,
  getAuthenticatedUser,
  getBooksToHome,
  getCategories,
};

export default bookApi;
