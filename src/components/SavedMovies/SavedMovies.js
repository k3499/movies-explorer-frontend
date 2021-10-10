import MoviesList from '../MoviesList/MoviesList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = ({
  movies,
  handleSearchSubmit,
  handleTumblerClick,
  saveMovie,
  deleteMovie,
  isFound,
  isRequestDone,
}) => (
    <section className="saved-movies">
      <SearchForm handleSearchSubmit={handleSearchSubmit} handleTumblerClick={handleTumblerClick} />
      <MoviesList
        moviesList={movies}
        isOnSavedPage={true}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        isFound={isFound}
        isRequestDone={isRequestDone} />

    </section>
);
export default SavedMovies;
