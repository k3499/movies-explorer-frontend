import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesList.css';

const MoviesList = ({
  moviesList, isOnSavedPage,
}) => (<ul className="movies-list">
    {
      moviesList.map((card) => <MoviesCard
        key={card._id}
        image={card.image}
        nameRU={card.nameRU}
        duration={card.duration}
        isOnSavedPage={isOnSavedPage}/>)
    }
  </ul>);

export default MoviesList;
