import axios from 'axios';

export const loginApi = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_BACKEND_API_ENDPOINT + '/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signUpApi = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_BACKEND_API_ENDPOINT + '/auth/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
