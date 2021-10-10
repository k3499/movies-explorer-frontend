export const BASE_URL_MOVIE = 'https://api.nomoreparties.co/beatfilm-movies';

class MovieApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  getData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  };

  getBeatFilmMovies() {
    return fetch(`${this.baseUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this.getData(res));
  }
}

const movieApi = new MovieApi({
  baseUrl: BASE_URL_MOVIE,
});

export default movieApi;
