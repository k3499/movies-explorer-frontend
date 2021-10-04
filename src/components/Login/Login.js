import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({
  onLogoClick,
  onLogin,
}) => (
  <section className="login">
    <AuthForm
      onLogoClick={onLogoClick}
      welcome="Рады видеть!"
      isNameVisible={false}
      button="Войти"
      handleSubmit={onLogin}
      caption="Еще не зарегистированы? "
      route="/signup"
      navLink="Регистрация"
    />
  </section>
);

export default Login;
