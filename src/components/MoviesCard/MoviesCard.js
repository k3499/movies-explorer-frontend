import { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({
  image, nameRU, duration, isOnSavedPage,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSaveBtnClick = () => {
    setIsClicked(!isClicked);
  };

  const saveButtonClassName = (
    `movies-card__button movies-card__button_type_save ${isClicked && 'movies-card__button_type_clicked-save'}`
  );

  return (
    <li className="movies-card">
      <div className="movies-card__head">
        <p className="movies-card__title">{nameRU}</p>
        <p className="movies-card__duration">{duration} минут</p>
      </div>
      <img className="movies-card__image" src={image} alt={nameRU} />
      {
        isOnSavedPage
          ? <button type="button" className="movies-card__button movies-card__button_type_delete"></button>
          : <button type="button" className={saveButtonClassName} onClick={handleSaveBtnClick}>Cохранить</button>
      }
    </li>
  );
};
export default MoviesCard;
