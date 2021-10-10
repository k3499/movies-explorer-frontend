export const BASE_URL = 'https://api.moviesearch.nomoredomains.club';

export const register = (email, password, name) => (
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (err) {
        return err;
      }
      return res;
    })
    .then((res) => res)
);

export const authorization = (email, password) => (
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      return data;
    })
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
