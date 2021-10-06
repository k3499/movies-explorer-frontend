import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({
  onLogoClick,
  onRegister,
}) => (
  <section className="register">
    <AuthForm
      onLogoClick={onLogoClick}
      welcome="Добро пожаловать!"
      isNameVisible={true}
      button="Зарегистрироваться"
      handleSubmit={onRegister}
      caption="Уже зарегистрированы? "
      route="/signin"
      navLink="Войти"
    />
  </section>
);

export default Register;
