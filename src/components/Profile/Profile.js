import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { NavLink } from 'react-router-dom';
import { emailInput, nameInput } from '../../utils/constants';
import { validateProfileForm } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

const Profile = ({
  handleLogout,
  handleSubmit,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const formRef = useRef();

  useEffect(() => {
    validateProfileForm(formRef.current).enableValidation();
  }, []);

  // запись значения инпутов при вводе

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case nameInput: setName(e.target.value);
        break;
      case emailInput: setEmail(e.target.value);
        break;
      default:
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      return;
    }
    handleSubmit(email, name);
  };
  return (
    <section className="profile">
      <form className="profile__form" method="POST" onSubmit={onSubmit} ref={formRef}>
        <h3 className="profile_title">Привет, {currentUser.name}!</h3>
        <div className="profile__formContainer">
          <label for="profile__name" className="profile__label">Имя</label>
          <input placeholder="Имя" id="name-input" className="profile__input profile__input_type_name" name="nameInput"
           value={name} onChange={handleInputChange} minLength="2" maxLength="30" required></input>
        </div>
        <span className="profile__input-error" id="name-input-error"></span>
        <div className="profile__formContainer">
          <label for="profile__email" className="profile__label">Почта</label>
          <input className="profile__input profile__input_type_email" type="email" placeholder="Почта"
              id="email-input" value={email} name="emailInput" onChange={handleInputChange} required
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"></input>
        </div>
        <span className="profile__input-error" id="email-input-error"></span>
        <button className="profile__button">Редактировать</button>
        <NavLink to="/" onClick={handleLogout} className="profile__logout">Выйти из аккаунта</NavLink>
      </form>
    </section>
  );
};

export default Profile;
