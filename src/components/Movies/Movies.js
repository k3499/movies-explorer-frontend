import SearchForm from '../SearchForm/SearchForm';
import { initialCards } from '../../utils/initialCards';
import './Movies.css';
import MoviesList from '../MoviesList/MoviesList';

const Movies = () => (
    <section className="movies">
      <SearchForm />
      <MoviesList moviesList={initialCards} isOnSavedPage={false} />
      <button className="movies__more" type="button">Ещё</button>
    </section>
);

export default Movies;
