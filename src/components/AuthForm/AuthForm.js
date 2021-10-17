import { NavLink } from 'react-router-dom';
import './AuthForm.css';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const AuthForm = ({
  welcome,
  isNameVisible,
  button,
  handleSubmit,
  caption,
  route,
  navLink,
  isDisabled,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = useFormWithValidation({});

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleSubmit(values);
    }
  };

  return (
    <form className="auth" method="POST" onSubmit={onSubmit} noValidate>
      <NavLink to="/" className="auth__logo" />
      <h3 className="auth__welcome">{welcome}</h3>

      {isNameVisible
      && <div className="auth__box">
        <label for="auth__name" className="auth__label">Имя</label>
        <input className={`auth__input ${errors && errors.name && 'auth__input_type_error'}`}
            placeholder="Имя" name="name" required id="name-input" minLength="2" maxLength="30"
            onChange={handleChange} disabled={isDisabled} />
        <span className="auth__error" id="name-input-error">
            {errors && errors.name && errors.name}
        </span>
      </div>
      }
      <div className="auth__box">
        <label for="auth__email" className="auth__label">Email</label>
        <input className={`auth__input ${errors && errors.email && 'auth__input_type_error'}`}
          placeholder="Email" type="email" name="email" required id="email-input" onChange={handleChange} disabled={isDisabled}
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
        <span className="auth__error" id="email-input-error">
          {errors && errors.email && errors.email}
        </span>
      </div>

      <div className="auth__box">
        <label for="auth__pass" className="auth__label">Пароль</label>
        <input className={`auth__input ${errors && errors.password && 'auth__input_type_error'}`} placeholder="Пароль" type="password" minLength="8"
          required name="password" id="password-input" onChange={handleChange} disabled={isDisabled} />
        <span className="auth__error" id="password-input-error">
        {errors && errors.password && errors.password}
        </span>
      </div>

      <button type="submit" className="auth__button" disabled={!isValid}>{button}</button>

      <p className="auth__caption">{caption}
        <NavLink to={route} className="auth__link">{navLink}</NavLink>
      </p>
    </form>
  );
};

export default AuthForm;
