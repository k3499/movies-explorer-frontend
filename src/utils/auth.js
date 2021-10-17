import { BASE_URL, Headers } from './constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}
export const HandleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
  return res.json();
};

export const register = (email, password, name) => (
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })
    .then(HandleOriginalResponse)
    .then((res) => res)
    .catch((err) => console.log(err))
);

export const authorization = (email, password) => (
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      return console.log('нет токена');
    })
    .catch((err) => console.log(err))
);

export const tokenCheck = (token) => (
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
);
