import BookClient from './BookClient';

const login = () => {
  return new Promise((resolve, reject) {
    const url = 'login';

    return BookClient.post(url)
      .then((response) => {
        resolve(response.data)
      })
      .catch(reject)
  });
};

const bookApi = {
  login,
};

export default bookApi;
