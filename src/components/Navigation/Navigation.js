import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ handleOnSavedMoviesClick }) => {
  const [isMoviesClicked, setIsMoviesClicked] = useState(true);
  const [isSavedMoviesClicked, setIsSavedMoviesClicked] = useState(false);
  const [isMainClicked, setIsMainClicked] = useState(false);

  const handleMoviesClick = () => {
    setIsMoviesClicked(true);
    setIsSavedMoviesClicked(false);
    setIsMainClicked(false);
  };

  const handleSavedMoviesClick = () => {
    setIsSavedMoviesClicked(true);
    setIsMoviesClicked(false);
    handleOnSavedMoviesClick();
    setIsMainClicked(false);
  };

  const handleMainClicked = () => {
    setIsMainClicked(true);
    setIsSavedMoviesClicked(false);
    setIsMoviesClicked(false);
  };

  return (
    <nav className="nav">
        <div className="nav__options">
        <NavLink to="/" className={`nav__link nav__link_type_main ${isMainClicked && 'nav__link_active'}`}
          onClick={handleMainClicked}>Главная</NavLink>
        <div className="nav__movies">
          <NavLink to="/movies" className={`nav__link ${isMoviesClicked && 'nav__link_active'}`}
            onClick={handleMoviesClick}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={`nav__link ${isSavedMoviesClicked && 'nav__link_active'}`}
            onClick={handleSavedMoviesClick}>Сохраненные фильмы</NavLink>
        </div>
        <NavLink to="/profile" className="nav__acc">
          Аккаунт

          <div className="nav__acc-img"></div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
