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
import { checkIfIsShort, searchMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  failMessage,
  registerSuccessMessage,
  movieSearchFailedMessage,
  updateSuccessMessage,
  loginErrorMessage,
  max480,
  max1024,
  max1920,
} from '../../utils/constants';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isFoundInMovies, setIsFoundInMovies] = useState(false);
  const [isFoundInSavedMovies, setIsFoundInSavedMovies] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [isRequestInSavedDone, setIsRequestInSavedDone] = useState(false);
  const [renderCount, setRenderCount] = useState(3);
  const [defaultRenderCount, setDefaultRenderCount] = useState(0);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
  const [isOnSavedPage, setIsOnSavedPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([
        api.getMovies(jwt),
        api.getUser(jwt),
      ]).then((values) => {
        const [svdMovies, userInfo] = values;
        const userSavedMovies = svdMovies.filter((m) => m.owner === currentUser._id);
        localStorage.setItem('savedMovies', JSON.stringify(userSavedMovies));
        setSavedMovies(userSavedMovies);
        setCurrentUser(userInfo);
        if (localStorage.getItem('beatFilmMovies')) {
          setBeatfilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
        }
      })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn, currentUser._id]);

  // проверка ширины экрана и выставление колиства карточек
  const checkWidth = () => {
    let renderValue = 0;
    if (window.innerWidth >= max1920) {
      setDefaultRenderCount(3);
      setRenderCount(12);
      renderValue = 12;
    }
    if (window.innerWidth >= 1024 && window.innerWidth < 1279) {
      setDefaultRenderCount(max1024);
      setRenderCount(8);
      renderValue = 8;
    }
    if (window.innerWidth < 1024 && window.innerWidth > 480) {
      setDefaultRenderCount(max1024);
      setRenderCount(8);
      renderValue = 8;
    }
    if (window.innerWidth <= 480 && window.innerWidth >= 320) {
      setDefaultRenderCount(max480);
      setRenderCount(5);
      renderValue = 5;
    }
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    setIsMoreBtnVisible(localMovies && (localMovies.length > renderValue));
    return { renderValue };
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
              setIsCheckingToken(false);
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
  const updateMovies = (umovies, isShortFilm) => {
    const amount = checkWidth();
    const moviesWithSavedOnes = umovies.map((movie) => {
      const savedItem = savedMovies.find((m) => m.movieId === movie.id);
      return savedItem || movie;
    });
    localStorage.setItem('movies', JSON.stringify(moviesWithSavedOnes));
    if (isShortFilm) {
      const shortFilms = moviesWithSavedOnes.filter(checkIfIsShort);
      setMovies(shortFilms);
      setIsMoreBtnVisible(shortFilms.length > amount.renderValue);
    } else {
      setMovies(moviesWithSavedOnes);
    }
  };

  // Поиск по ключевым словам
  const searchPromise = (query) => (

    new Promise((resolve, reject) => {
      if (beatfilmMovies.length === 0) {
        movieApi.getBeatFilmMovies()
          .then((bfmovies) => {
            localStorage.setItem('beatFilmMovies', JSON.stringify(movies));
            setBeatfilmMovies(bfmovies);
            resolve(searchMovies(bfmovies, query));
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } else {
        resolve(searchMovies(beatfilmMovies, query));
      }
    })
  );

  const searchInSavedPromise = (query) => (
    new Promise((resolve, reject) => {
      if (savedMovies) {
        resolve(searchMovies(savedMovies, query));
      } else {
        reject(movieSearchFailedMessage);
      }
    })
  );
  // попап для ошибок
  const openInfoPopup = (message) => {
    setPopupMessage(message);
    setIsInfoPopupOpen(true);
  };
  // обработка поискового запроса
  const handleSearchInMovies = (query, isShortFilm) => {
    setIsLoading(true);
    searchPromise(query)
      .then((res) => {
        console.log(res);
        if (res && res.length > 0) {
          setIsFoundInMovies(true);
          console.log('yes');
          localStorage.setItem('movies', JSON.stringify(res));
          updateMovies(res, isShortFilm);
        } else {
          console.log(res);
          console.log('no');
          localStorage.removeItem('movies');
          setIsFoundInMovies(false);
          setIsMoreBtnVisible(false);
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoPopup(movieSearchFailedMessage);
      })
      .finally(() => {
        setIsRequestDone(true);
        setIsLoading(false);
      });
  };
  // поиск в сохраненных фильмах
  const handleSearchInSaved = (query, isShortFilm) => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  const handleSearch = (query, isShortFilm) => (
    isOnSavedPage
      ? handleSearchInSaved(query, isShortFilm)
      : handleSearchInMovies(query, isShortFilm)
  );

  // фильтр короткометражек
  const filterShortFilms = (isChecked) => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies && localMovies.length > 0) {
      setIsFoundInMovies(true);
      updateMovies(localMovies, isChecked);
    }
    setIsRequestDone(true);
  };

  // фильтр короткометражек в сохраненных фильмах
  const filterShortFilmsInSaved = (isChecked) => {
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (localSavedMovies && localSavedMovies.length > 0) {
      setIsFoundInSavedMovies(true);
      if (isChecked) {
        const shortFilms = savedMovies.filter(checkIfIsShort);
        setSavedMovies(shortFilms);
      } else {
        setSavedMovies(localSavedMovies);
      }
    }
    setIsRequestInSavedDone(true);
  };

  // кнопка короткометражек
  const handleTumblerClick = (isChecked) => {
    if (isRequestDone || isRequestInSavedDone) {
      if (isOnSavedPage) {
        filterShortFilmsInSaved(isChecked);
      } else {
        filterShortFilms(isChecked);
      }
    }
  };

  // сохранить фильм
  const saveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const isSaved = localSavedMovies.some((m) => m.movieId === movie.id);
    if (!isSaved) {
      setIsLoading(true);
      api.saveMovie(jwt, movie)
        .then((smovie) => {
          setMovies(movies.map((m) => (m.id === smovie.movieId ? smovie : m)));
          const newSavedMovies = [smovie, ...localSavedMovies];
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
          setSavedMovies(newSavedMovies);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // удалить фильма из сохраненных
  const deleteMovie = (movieId, movie) => {
    setIsLoading(true);
    console.log(movie);
    const jwt = localStorage.getItem('jwt');
    const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    api.deleteMovie(jwt, movieId)
      .then((deletedMovie) => {
        const newMovies = localSavedMovies.filter((nmovie) => nmovie._id !== deletedMovie._id);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        setSavedMovies(newMovies);
        setMovies(movies.map((setmovie) => (setmovie._id === movieId
          ? beatfilmMovies.find((m) => m.id === setmovie.movieId)
          : setmovie)));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
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
  // закрыть все попапы
  const closeAllPopups = () => {
    setIsMenuOpen(false);
    setIsInfoPopupOpen(false);
  };
  // esc закрыть
  const handleEscClose = (event) => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleOnMoviesClick = () => {
    setIsOnSavedPage(false);
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (localMovies && localMovies.length > 0) {
      setIsFoundInMovies(true);
      setIsRequestDone(true);
      updateMovies(localMovies, false);
    }
  };
  // Кнопка еще
  const handleMoreBtnClick = () => {
    const newAmount = renderCount
    + Math.min((movies.length - renderCount), defaultRenderCount);
    setRenderCount(newAmount);
    if (movies.length - newAmount === 0) {
      setIsMoreBtnVisible(false);
    }
  };

  const setEscListener = () => {
    document.addEventListener('keydown', handleEscClose);
  };
  // меню на маленьких экранах
  const openMenu = () => {
    setIsMenuOpen(true);
    setEscListener();
  };

  const handleCLosePopupByClickOnOverlay = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  // авторизация
  const handleLogin = ({ email, password }) => {
    auth.authorization(email, password)
      .then((data) => {
        if (data && data.token) {
          setCurrentUser({ email: data.email, name: data.name, _id: data._id });
          setIsLoggedIn(true);
          history.push('/movies');
        } else {
          openInfoPopup(loginErrorMessage);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        openInfoPopup(failMessage);
      });
  };

  // регистрация
  const handleRegister = ({ email, password, name }) => {
    auth.register(email, password, name)
      .then((res) => {
        if (res) {
          setIsRegisterFailed(false);
          openInfoPopup(registerSuccessMessage);
          handleLogin({ email, password });
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

  // Логаут
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('beatFilmMovies');
    setMovies([]);
    setIsMoreBtnVisible(false);
    history.push('/');
  };

  // редактирование профиля
  const handleEditProfile = ({ email, name }) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.updateUser(jwt, email, name)
      .then((res) => {
        if (res) {
          setCurrentUser({ email: res.email, name: res.name, _id: res._id });
          openInfoPopup(updateSuccessMessage);
        }
      })
      .catch((err) => {
        openInfoPopup(failMessage);
        console.log(err);
      });
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
          <ProtectedRoute path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            movies={movies}
            handleSearchSubmit={handleSearch}
            handleTumblerClick={handleTumblerClick}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            isFound={isFoundInMovies}
            isRequestDone={isRequestDone}
            renderCount={renderCount}
            handleMoreBtnClick={handleMoreBtnClick}
            isMoreBtnVisible={isMoreBtnVisible}
            isLoading={isLoading}
            isDisabled={isLoading}
            isChecking={isCheckingToken}/>
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            movies={savedMovies}
            handleSearchSubmit={handleSearchInSaved}
            handleTumblerClick={handleTumblerClick}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            isFound={isFoundInSavedMovies}
            isRequestDone={isRequestInSavedDone}
            isLoading={isLoading}
            isDisabled={isLoading}
            isChecking={isCheckingToken}/>
          <ProtectedRoute path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            handleSubmit={handleEditProfile}
            isLoading={isLoading}
            isDisabled={isLoading}
            isChecking={isCheckingToken}/>
          <Route path="/signin">
            <Login onLogin={handleLogin}
            isDisabled={isLoading}/>
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister}
            isDisabled={isLoading} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        <Footer pathname={location.pathname} />
        <Menu handleMenuClose={closeAllPopups}
          isOpen={isMenuOpen}
          handleOnSavedMoviesClick={handleOnSavedMoviesClick}
          handleOnMoviesClick={handleOnMoviesClick}
          onClick={handleCLosePopupByClickOnOverlay} />
        <Popup
          closePopup={closeAllPopups}
          isOpen={isInfoPopupOpen}
          isFailed={isRegisterFailed}
          message={popupMessage}
          onClick={handleCLosePopupByClickOnOverlay} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
