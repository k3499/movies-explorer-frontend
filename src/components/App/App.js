import React, { useState } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router';
import './App.css';
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

function App() {
  const location = useLocation();
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOnLanding, setIsOnLanding] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);

  const enterLanding = () => {
    setIsOnLanding(true);
  };

  const leaveLanding = () => {
    setIsOnLanding(false);
  };

  const handleLogoClick = () => {
    enterLanding();
  };

  const handleRegisterClick = () => {
    leaveLanding();
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  // при ошибках с api
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsMenuOpen(false);
    setIsPopupOpen(false);
  };
  const handleLoginClick = () => {
    leaveLanding();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    enterLanding();
    history.push('/');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    history.push('/movies');
  };

  const handleRegister = () => {
    // статус от api
    setIsRegisterFailed(false);
    openPopup();
    history.push('/signin');
  };
  const handleEditProfile = () => {

  };

  return (
    <div className="App">
            <Header pathname={location.pathname} isLoggedIn={isLoggedIn} isOnLanding={isOnLanding}
             onLogoClick={handleLogoClick} onRegisterClick={handleRegisterClick}
             onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
             handleOnMainClick={enterLanding} handleOnMoviesClick={leaveLanding}
             handleOnAccountClick={leaveLanding} />

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile userName="Кирилл" handleLogout={handleLogout} handleSubmit={handleEditProfile}/>
        </Route>
        <Route exact path="/signin">
          <Login onLogoClick={handleLogoClick} onLogin={handleLogin}/>
        </Route>
        <Route exact path="/signup">
          <Register onLogoClick={handleLogoClick} onRegister={handleRegister}/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <Footer pathname={location.pathname} />
      <Menu handleMenuClose={closeAllPopups} isOpen={isMenuOpen} handleOnMainClick={enterLanding}
        handleOnMoviesClick={leaveLanding} handleOnAccountClick={leaveLanding} />
      <Popup closePopup={closeAllPopups} isOpen={isPopupOpen} isFailed={isRegisterFailed}/>
    </div>
  );
}

export default App;
