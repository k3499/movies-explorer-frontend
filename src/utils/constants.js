const shortFilmCheck = 'shortFilmCheckbox';

const shortMoviesDuration = 40;
const registerSuccessMessage = 'Вы успешно зарегистрированы!';
const failMessage = 'Произошла ошибка! Попробуйте ещё раз.';
const updateSuccessMessage = 'Данные успешно обновлены!';
const movieSearchFailedMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const movieInput = 'movieInput';
const defPr = 'default';
const loginErrorMessage = 'Почта или пароль введены не верно. Попробуйте еще раз!';
const BASE_URL_MOVIE = 'https://api.nomoreparties.co';
const BASE_URL = 'https://api.moviesearch.nomoredomains.club';
const Headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const max1920 = 3;
const max1024 = 2;
const max480 = 1;

export {
  shortFilmCheck,
  movieInput,
  registerSuccessMessage,
  failMessage,
  updateSuccessMessage,
  movieSearchFailedMessage,
  defPr,
  loginErrorMessage,
  BASE_URL_MOVIE,
  BASE_URL,
  Headers,
  shortMoviesDuration,
  max480,
  max1024,
  max1920,
};
