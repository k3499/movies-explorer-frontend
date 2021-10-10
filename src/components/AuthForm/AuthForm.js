import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './AuthForm.css';
import {
  emailInput,
  passwordInput,
  nameInput,
  loginType,
  registerType,
} from '../../utils/constants';
import { validateAuthForm } from '../../utils/utils';

const AuthForm = ({
  welcome,
  isNameVisible,
  button,
  handleSubmit,
  caption,
  route,
  navLink,
  type,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRef = useRef();

  useEffect(() => {
    validateAuthForm(formRef.current).enableValidation();
  }, []);

  //  записьзначения инпутов при вводе
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case nameInput: setName(e.target.value);
        break;
      case emailInput: setEmail(e.target.value);
        break;
      case passwordInput: setPassword(e.target.value);
        break;
      default:
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    switch (type) {
      case loginType: handleSubmit(email, password);
        break;
      case registerType: handleSubmit(email, password, name);
        break;
      default:
        console.log(`Нет формы ${type}`);
        break;
    }
  };

  return (
    <form className="auth" method="POST" onSubmit={onSubmit} ref={formRef}>
      <NavLink to="/" className="auth__logo" />
      <h3 className="auth__welcome">{welcome}</h3>

      {isNameVisible
      && <div className="auth__box">
        <label for="auth__name" className="auth__label">Имя</label>
        <input className="auth__input" name="nameInput" required id="name-input"
              minLength="2" maxLength="30" value={name} onChange={handleInputChange} />
        <span className="auth__error" id="name-input-error"></span>
      </div>
      }
      <div className="auth__box">
        <label for="auth__email" className="auth__label">Email</label>
        <input className="auth__input" type="email" name="emailInput" required
            id="email-input" value={email} onChange={handleInputChange}
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
        <span className="auth__error" id="email-input-error"></span>
      </div>

      <div className="auth__box">
        <label for="auth__pass" className="auth__label">Пароль</label>
        <input className="auth__input" type="password" minLength="8"
            required name="passwordInput" id="password-input" value={password} onChange={handleInputChange} />
        <span className="auth__error" id="password-input-error"></span>
      </div>

      <button type="submit" className="auth__button">{button}</button>

      <p className="auth__caption">{caption}
        <NavLink to={route} className="auth__link">{navLink}</NavLink>
      </p>
    </form>
  );
};

export default AuthForm;
