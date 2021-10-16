import { defPr, BASE_URL_MOVIE } from './constants';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  toggleMovieSave(jwt, movie, movieId, isSaved) {
    return isSaved ? this.deleteMovie(jwt, movieId) : this.saveMovie(jwt, movie);
  }

  getUser(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => this._getData(res));
  }

  updateUser(jwt, email, name) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then((res) => this._getData(res));
  }

  getMovies(jwt) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getData(res));
  }

  saveMovie(jwt, movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        country: movie.country ? movie.country : defPr,
        director: movie.director ? movie.director : defPr,
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : 0,
        description: movie.description ? movie.description : defPr,
        image: movie.image.url ? BASE_URL_MOVIE + movie.image.url : movie.image,
        trailer: movie.trailer ? movie.trailer : movie.trailerLink,
        nameRU: movie.nameRU ? movie.nameRU : defPr,
        nameEN: movie.nameEN ? movie.nameEN : defPr,
        thumbnail: movie.thumbnail
          ? movie.thumbnail
          : BASE_URL_MOVIE + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      }),
    })
      .then((res) => this._getData(res));
  }

  deleteMovie(jwt, movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((res) => this._getData(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.moviesearch.nomoredomains.club',
});

export default api;
