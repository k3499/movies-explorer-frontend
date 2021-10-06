import { useState } from 'react';
import { movieInput } from '../../utils/constants';
import './SearchForm.css';

const SearchForm = () => {
  const [movie, setMovie] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  // запись значения инпутов при вводе
  const handleInputChange = (e) => {
    if (e.target.name === movieInput) {
      setMovie(e.target.value);
    } else {
      console.log(`Нет инпута: ${e.target.name}`);
    }
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__container">
          <input className="search__input" placeholder="Фильм" required value={movie}
          onChange={handleInputChange} name="movieInput"></input>
          <button type="submit" className="search__button">Поиск</button>
        </div>
      </form>
      <div className="search__tumbler-container">
          <label className="search__tumbler">
            <input type="checkbox" className="search__checkbox"></input>
            <span className="search__slider"></span>
          </label>

          <span className="search__label-text">Короткометражки</span>
      </div>
    </div>

  );
};

export default SearchForm;
