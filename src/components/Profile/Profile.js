import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const Profile = ({
  handleLogout,
  handleSubmit,
  isDisabled,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSubmit(values);
    }
  };
  return (
    <section className="profile">
      <form className="profile__form" method="POST" onSubmit={onSubmit} noValidate>
        <h3 className="profile_title">Привет, {currentUser.name}!</h3>
        <div className="profile__formContainer">
          <label for="profile__name" className="profile__label">Имя</label>
          <input className="profile__input profile__input_type_name" placeholder="Имя" id="name-input"
            name="name" onChange={handleChange} disabled={isDisabled} value={values.name} minLength="2" maxLength="30" required></input>
          <span className="profile__input-error" id="name-input-error">
            {errors && errors.name !== '' && errors.name}
          </span>
        </div>
        <span className="profile__input-error" id="name-input-error"></span>
        <div className="profile__formContainer">
          <label for="profile__email" className="profile__label">Почта</label>
          <input className="profile__input profile__input_type_email" type="email" placeholder="Почта"
              id="email-input" name="email" onChange={handleChange} disabled={isDisabled} value={values.email} required
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"></input>
        </div>
        <span className="profile__input-error" id="email-input-error">
              {errors && errors.email !== '' && errors.email}
        </span>
        <button className="profile__button" disabled={ !isValid || isDisabled }>Редактировать</button>
        <NavLink to="/" onClick={handleLogout} className="profile__logout">Выйти из аккаунта</NavLink>
      </form>
    </section>
  );
};

export default Profile;
