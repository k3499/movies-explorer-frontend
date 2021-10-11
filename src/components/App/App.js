import React, { useState, useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router';
import './App.css';
import * as auth from '../../utils/auth';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import Popup from '../Popup/Popup';
import api from '../../utils/api';
import movieApi from '../../utils/MovieApi';
import { searchMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  failMessage,
  registerSuccessMessage,
  movieSearchFailedMessage,
  updateSuccessMessage,
} from '../../utils/constants';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isFoundInMovies, setIsFoundInMovies] = useState(false);
  const [isFoundInSavedMovies, setIsFoundInSavedMovies] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [isRequestInSavedDone, setIsRequestInSavedDone] = useState(false);
  const [amountToRender, setAmountToRender] = useState(3);
  const [defaultAmountToRender, setDefaultAmountToRender] = useState(0);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
  const [isOnSavedPage, setIsOnSavedPage] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      Promise.all([
        api.getMovies(jwt),
        api.getUser(jwt),
      ]).then((values) => {
        const [savedMovies, userInfo] = values;
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);
        setCurrentUser(userInfo);
        if (localStorage.getItem('beatFilmMovies')) {
          setBeatfilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
        }
      })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const checkWidth = () => {
    if (window.innerWidth >= 1280) {
      console.log('ksjdkjs');
      setDefaultAmountToRender(3);
      setAmountToRender(3);
    }
    if (window.innerWidth <= 480 && window.innerWidth >= 320) {
      console.log('aww');
      setDefaultAmountToRender(1);
      setAmountToRender(1);
    }
    if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
      setDefaultAmountToRender(2);
      setAmountToRender(2);
    }
    if (window.innerWidth <= 768 && window.innerWidth > 480) {
      setDefaultAmountToRender(1);
      setAmountToRender(1);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // проверка залогиген ли пользователь
  useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        auth.tokenCheck(jwt)
          .then((res) => {
            if (res) {
              setCurrentUser({ email: res.email, name: res.name, _id: res._id });
              setIsLoggedIn(true);
              history.push('/movies');
            } else {
              setIsLoggedIn(false);
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      }
    };
    handleTokenCheck();
    localStorage.removeItem('movies');
  }, [history]);

  // добавление в найденые фильмы инфы о сохранении
  const updateMovies = (movies) => {
    console.log('yes');
    const moviesWithSavedOnes = movies.map((movie) => {
      const savedItem = savedMovies.find((m) => m.movieId === movie.id);
      if (savedItem) {
        return savedItem;
      }
      return movie;
    });
    localStorage.setItem('movies', JSON.stringify(moviesWithSavedOnes));
    setMovies(moviesWithSavedOnes);
    // setAmountToRender(defaultAmountToRender);
  };

  // поиск фильма по ключевым словам и фильтр короткометражек
  const searchPromise = (query, isShortFilm) => (
    new Promise((resolve, reject) => {
      if (beatfilmMovies.length === 0) {
        movieApi.getBeatFilmMovies()
          .then((movies) => {
            localStorage.setItem('beatFilmMovies', JSON.stringify(movies));
            setBeatfilmMovies(movies);
            resolve(searchMovies(movies, query, isShortFilm));
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } else {
        resolve(searchMovies(beatfilmMovies, query, isShortFilm));
      }
    })
  );

  const searchInSavedPromise = (query, isShortFilm) => (
    new Promise((resolve, reject) => {
      if (savedMovies) {
        resolve(searchMovies(savedMovies, query, isShortFilm));
      } else {
        reject(movieSearchFailedMessage);
      }
    })
  );
  // попап при ошибках в работе api
  const openInfoPopup = (message) => {
    setPopupMessage(message);
    setIsInfoPopupOpen(true);
  };
  // обработка поискового запроса
  const handleSearchInMovies = (query, isShortFilm) => {
    // setAmountToRender(defaultAmountToRender);
    searchPromise(query, isShortFilm)
      .then((res) => {
        if (res && res.length > 0) {
          setIsFoundInMovies(true);
          console.log('yes');
          localStorage.setItem('movies', JSON.stringify(res));
          checkWidth();
          updateMovies(res);
          console.log(res.length, amountToRender, res.length > amountToRender);
          setIsMoreBtnVisible(res.length > amountToRender);
        } else {
          setIsMoreBtnVisible(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoPopup(movieSearchFailedMessage);
      })
      .finally(() => {
        setIsRequestDone(true);
      });
  };
  // поиск по сохранным фильмам
  const handleSearchInSaved = (query, isShortFilm) => {
    searchInSavedPromise(query, isShortFilm)
      .then((res) => {
        if (res && res.length > 0) {
          setIsFoundInSavedMovies(true);
          setSavedMovies(res);
        } else {
          setIsFoundInSavedMovies(true);
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoPopup(movieSearchFailedMessage);
      })
      .finally(() => {
        setIsRequestInSavedDone(true);
      });
  };

  const handleSearch = (query, isShortFilm) => (isOnSavedPage
    ? handleSearchInSaved(query, isShortFilm)
    : handleSearchInMovies(query, isShortFilm));

  // фильтр короткометражек в фильмах
  const filterShortFilms = (isChecked) => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies && localMovies.length > 0) {
      setIsFoundInMovies(true);
      if (isChecked) {
        const shortFilms = movies.filter((m) => m.duration <= 40);
        setMovies(shortFilms);
      } else {
        setMovies(localMovies);
      }
    }
    setIsRequestDone(true);
  };

  // фильтр короткометражек в сохраненных фильмах
  const filterShortFilmsInSaved = (isChecked) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (localSavedMovies && localSavedMovies.length > 0) {
      setIsFoundInSavedMovies(true);
      if (isChecked) {
        const shortFilms = savedMovies.filter((m) => m.duration <= 40);
        setSavedMovies(shortFilms);
      } else {
        setSavedMovies(localSavedMovies);
      }
    }
    setIsRequestInSavedDone(true);
  };

  // обработчик переключения тумблера короткометражки
  const handleTumblerClick = (isChecked, movie) => {
    if (isOnSavedPage) {
      localStorage.setItem('isTumblerInSavedOn', isChecked);
      filterShortFilmsInSaved(isChecked);
    } else {
      localStorage.setItem('isTumblerInMoviesOn', isChecked);
      filterShortFilms(isChecked, movie);
    }
  };

  // сохраняем фильм
  const saveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const isSaved = localSavedMovies.some((m) => m.movieId === movie.id);
    if (!isSaved) {
      api.saveMovie(jwt, movie)
        .then((movie) => {
          setMovies(movies.map((m) => (m.id === movie.movieId ? movie : m)));
          const newSavedMovies = [movie, ...localSavedMovies];
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
          setSavedMovies(newSavedMovies);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          console.log('saved', savedMovies.length);
        });
    }
  };

  // удаление фильма из сохраненных
  const deleteMovie = (movieId, movie) => {
    console.log(movie);
    const jwt = localStorage.getItem('jwt');
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    api.deleteMovie(jwt, movieId)
      .then((deletedMovie) => {
        const newMovies = localSavedMovies.filter((movie) => movie._id !== deletedMovie._id);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        setSavedMovies(newMovies);
        setMovies(movies.map((movie) => (movie._id === movieId
          ? beatfilmMovies.find((m) => m.id === movie.movieId)
          : movie)));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log('after delete', savedMovies.length);
      });
  };

  // сброс фильмов после поиска и отображение всех сохраненных фильмов
  const handleOnSavedMoviesClick = () => {
    setIsOnSavedPage(true);
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (localSavedMovies && localSavedMovies.length > 0) {
      setIsFoundInSavedMovies(true);
      setIsRequestInSavedDone(true);
      setSavedMovies(localSavedMovies);
    }
  };
  const handleOnMoviesClick = () => {
    setIsOnSavedPage(false);
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies && localMovies.length > 0) {
      setIsFoundInMovies(true);
      setIsRequestDone(true);
      updateMovies(localMovies);
      setAmountToRender(defaultAmountToRender);
      if (localMovies.length - defaultAmountToRender === 0) {
        setIsFoundInMovies(false);
        setIsMoreBtnVisible(false);
      } else {
        setIsMoreBtnVisible(true);
      }
      // setMovies(localMovies);
    }
  };
  useEffect(() => {
    console.log('amount', amountToRender);
  }, [amountToRender]);

  const handleMoreBtnClick = () => {
    const newAmount = amountToRender
    + Math.min((movies.length - amountToRender), defaultAmountToRender);
    setAmountToRender(newAmount);
    if (movies.length - newAmount === 0) {
      setIsMoreBtnVisible(false);
    }
  };
  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeAllPopups = () => {
    setIsMenuOpen(false);
    setIsInfoPopupOpen(false);
  };

  // авторизация
  const handleLogin = (email, password) => {
    auth.authorization(email, password)
      .then((data) => {
        console.log(data);
        if (data && data.token) {
          setCurrentUser({ email: data.email, name: data.name, _id: data._id });
          setIsLoggedIn(true);
          history.push('/movies');
        } else {
          setIsLoggedIn(false);
          history.push('/');
        }
      })
      .catch((err) => console.log(err.message));
  };

  // регистрация
  const handleRegister = (email, password, name) => {
    auth.register(email, password, name)
      .then((res) => {
        console.log('res', res);
        if (res) {
          setIsRegisterFailed(false);
          openInfoPopup(registerSuccessMessage);
          handleLogin(email, password);
        } else {
          setIsRegisterFailed(true);
          openInfoPopup(failMessage);
        }
      })
      .catch((err) => {
        setIsRegisterFailed(true);
        openInfoPopup(failMessage);
        console.log(err.message);
      });
  };

  // выход из аккаунта
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    history.push('/');
  };

  // редактирование профиля
  const handleEditProfile = (email, name) => {
    const jwt = localStorage.getItem('jwt');
    api.updateUser(jwt, email, name)
      .then((res) => {
        if (res) {
          setCurrentUser({ email: res.email, name: res.name, _id: res._id });
          openInfoPopup(updateSuccessMessage);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <Header pathname={location.pathname}
        isLoggedIn={isLoggedIn}
        handleMenuOpen={openMenu}
        handleOnSavedMoviesClick={handleOnSavedMoviesClick}
        handleOnMoviesClick={handleOnMoviesClick} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute exact path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            movies={movies}
            handleSearchSubmit={handleSearch}
            handleTumblerClick={handleTumblerClick}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            isFound={isFoundInMovies}
            isRequestDone={isRequestDone}
            amountToRender={amountToRender}
            handleMoreBtnClick={handleMoreBtnClick}
            isMoreBtnVisible={isMoreBtnVisible}/>
          <ProtectedRoute exact path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            movies={savedMovies}
            handleSearchSubmit={handleSearchInSaved}
            handleTumblerClick={handleTumblerClick}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            isFound={isFoundInSavedMovies}
            isRequestDone={isRequestInSavedDone} />
          <ProtectedRoute exact path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            handleSubmit={handleEditProfile} />
          <Route exact path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <Footer pathname={location.pathname} />
        <Menu handleMenuClose={closeAllPopups}
          isOpen={isMenuOpen}
          handleOnSavedMoviesClick={handleOnSavedMoviesClick}
          handleOnMoviesClick={handleOnMoviesClick} />
        <Popup
          closePopup={closeAllPopups}
          isOpen={isInfoPopupOpen}
          isFailed={isRegisterFailed}
          message={popupMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
