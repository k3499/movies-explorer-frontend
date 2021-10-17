import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesList from '../MoviesList/MoviesList';

const Movies = ({
  movies,
  handleSearchSubmit,
  handleTumblerClick,
  saveMovie,
  deleteMovie,
  isFound,
  isRequestDone,
  renderCount,
  handleMoreBtnClick,
  isMoreBtnVisible,
  isLoading,
  isDisabled,
}) => {
  const onMoreBtnClick = () => {
    handleMoreBtnClick(renderCount);
  };

  return (
    <section className="movies">
      <SearchForm handleSearchSubmit={handleSearchSubmit}
      handleTumblerClick={handleTumblerClick}
      isDisabled={isDisabled} />
      <MoviesList movieList={movies}
       isOnSavedPage={false}
       saveMovie={saveMovie}
       deleteMovie={deleteMovie}
       isFound={isFound}
       isRequestDone={isRequestDone}
       renderCount={renderCount}
       isLoading={isLoading} />
      {isMoreBtnVisible && <button className="movies__more" type="button" onClick={onMoreBtnClick}>Ещё</button>}
    </section>
  );
};

export default Movies;
