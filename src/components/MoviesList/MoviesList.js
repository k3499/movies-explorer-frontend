import { v4 as uuidv4 } from 'uuid';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesList.css';

const MoviesList = ({
  movieList,
  isOnSavedPage,
  saveMovie,
  deleteMovie,
  isFound,
  isRequestDone,
  amountToRender,
}) => {
  const movieslistClassName = (
    `movies-list
    ${!isRequestDone && 'movies-list_hidden'}`
  );

  console.log(amountToRender);
  console.log(isFound);
  console.log(movieList);
  return <ul className={movieslistClassName}>
    {
      isFound ? movieList.slice(0, amountToRender).map((movie) => (
        <MoviesCard key={uuidv4()} movie={movie} image={movie.image}
          nameRU={movie.nameRU} duration={movie.duration} isOnSavedPage={isOnSavedPage}
          saveMovie={saveMovie} deleteMovie={deleteMovie} />
      )) : <li className="movies-list__not-found-text">Ничего не найдено</li>
    }
  </ul>;
};
export default MoviesList;
