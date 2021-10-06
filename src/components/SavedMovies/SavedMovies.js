import { initialSavedCards } from '../../utils/initialCards';
import MoviesList from '../MoviesList/MoviesList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => (
    <section className="saved-movies">
      <SearchForm />
      <MoviesList moviesList={initialSavedCards} isOnSavedPage={true} />
    </section>
);
export default SavedMovies;
