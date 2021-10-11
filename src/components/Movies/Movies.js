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
  amountToRender,
  handleMoreBtnClick,
  isMoreBtnVisible,
}) => {
  const onMoreBtnClick = () => {
    handleMoreBtnClick(amountToRender);
  };

  return (
    <section className="movies">
      <SearchForm handleSearchSubmit={handleSearchSubmit} handleTumblerClick={handleTumblerClick}/>
      <MoviesList movieList={movies}
       isOnSavedPage={false}
       saveMovie={saveMovie}
       deleteMovie={deleteMovie}
       isFound={isFound}
       isRequestDone={isRequestDone}
       amountToRender={amountToRender} />
      {isMoreBtnVisible && <button className="movies__more" type="button" onClick={onMoreBtnClick}>Ещё</button>}
    </section>
  );
};

export default Movies;
