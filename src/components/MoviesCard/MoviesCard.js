import { useContext } from 'react';
import './MoviesCard.css';
import { BASE_URL_MOVIE } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({
  image,
  nameRU,
  duration,
  isOnSavedPage,
  movie,
  saveMovie,
  deleteMovie,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isSaved = movie.owner && movie.owner === currentUser._id;
  const handleSaveBtnClick = () => {
    if (isSaved) {
      deleteMovie(movie._id, movie);
    } else {
      saveMovie(movie);
    }
  };

  const handleDeleteBtnClick = () => {
    deleteMovie(movie._id, movie);
  };

  const saveButtonClassName = (
    `movies-card__button movies-card__button_type_save ${isSaved && 'movies-card__button_type_clicked-save'}`
  );

  return (
    <li className="movies-card">
      <div className="movies-card__head">
        <p className="movies-card__title">{nameRU}</p>
        <p className="movies-card__duration">{duration} минут</p>
      </div>
        <a className="movies-card__image-link" href={movie.trailer} target="_blank" rel="noreferrer">
          <div className="movies-card__image" style={{ background: `center/cover url(${(isSaved && image) ? image : BASE_URL_MOVIE + image.url}) no-repeat` }}></div>
        </a>
        {
        isOnSavedPage
          ? <button type="button" className="movies-card__button movies-card__button_type_delete"
          aria-label="Удалить фильм." onClick={handleDeleteBtnClick}></button>
          : <button type="button" className={saveButtonClassName} onClick={handleSaveBtnClick} aria-label="Сохранить фильм.">Сохранить</button>
      }
    </li>
  );
};
export default MoviesCard;
