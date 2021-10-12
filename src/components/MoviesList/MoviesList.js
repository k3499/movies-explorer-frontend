import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesList.css';

const MoviesList = ({
  movieList,
  isOnSavedPage,
  saveMovie,
  deleteMovie,
  isFound,
  isRequestDone,
  renderCount,
  isLoading,
}) => {
  const movieslistClassName = (
    `movies-list
    ${!isRequestDone && 'movies-list_hidden'}`
  );

  return <>
  {isLoading && <Preloader />}
  <ul className={movieslistClassName}>
    {/* {isLoading && <Preloader />} */}
    {
      isFound ? movieList.slice(0, renderCount).map((movie) => (
         <MoviesCard key={movie.nameRU} movie={movie} image={movie.image}
          nameRU={movie.nameRU} duration={movie.duration} isOnSavedPage={isOnSavedPage}
          saveMovie={saveMovie} deleteMovie={deleteMovie} />
      )) : <li className="movies-list__not-found-text">Ничего не найдено</li>
    }
  </ul>
</>;
};
export default MoviesList;
