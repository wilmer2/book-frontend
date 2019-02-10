import BookClient from './BookClient';

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
};

export default bookApi;
