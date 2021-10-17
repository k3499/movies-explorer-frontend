import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({
  onLogin,
  isDisabled,
}) => (
  <section className="login">
    <AuthForm
      welcome="Рады видеть!"
      isNameVisible={false}
      button="Войти"
      handleSubmit={onLogin}
      caption="Еще не зарегистированы? "
      route="/signup"
      navLink="Регистрация"
      isDisabled={isDisabled}
    />
  </section>
);

export default Login;
