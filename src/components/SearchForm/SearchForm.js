import { useState } from 'react';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import './SearchForm.css';

const SearchForm = ({
  handleSearchSubmit, handleTumblerClick,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    isDisabled,
  } = useFormWithValidation({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleSearchSubmit(values.movie, isChecked);
    }
  };

  // запись значения инпутов при вводе
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    handleTumblerClick(e.target.checked, values.movie);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">
          <input className={`search__input ${errors && errors.movie && 'search__input_type_error'}`}
          placeholder="Фильм" required onChange={handleChange} disabled={isDisabled} name="movie" type="text"
          pattern="^[а-яА-Яa-zA-Z\d\s\-]+$"></input>
          <button type="submit" className="search__button" disabled={!isValid}>Поиск</button>
        </div>
      </form>
      <div className="search__tumbler-container">
          <label className="search__tumbler">
          <input type="checkbox" name="shortFilmCheckbox" className="search__checkbox"
          checked={isChecked} onChange={handleCheckboxChange} disabled={isDisabled}></input>
            <span className="search__slider"></span>
          </label>

          <span className="search__label-text">Короткометражки</span>
      </div>
    </div>

  );
};

export default SearchForm;
