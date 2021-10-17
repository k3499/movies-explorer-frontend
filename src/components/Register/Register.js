import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = ({
  onRegister,
  isDisabled,
}) => (
  <section className="register">
    <AuthForm
      welcome="Добро пожаловать!"
      isNameVisible={true}
      button="Зарегистрироваться"
      handleSubmit={onRegister}
      caption="Уже зарегистрированы? "
      route="/signin"
      navLink="Войти"
      isDisabled={isDisabled}
    />
  </section>
);

export default Register;
