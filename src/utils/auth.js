export const BASE_URL = "https://api.mesto.k3499.nomoredomains.club";

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
     email, password, name
    })
  })
    .then((res) => {
      try {
        if(res.status === 200) {
          return res.json();
        }
      } catch(err) {
        return err;
      }
    })
    .then((res) => {
      return res;
    });
}
