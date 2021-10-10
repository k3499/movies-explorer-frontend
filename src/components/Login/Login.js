import AuthForm from '../AuthForm/AuthForm';
import { loginType } from '../../utils/constants';
import './Login.css';

const Login = ({
  onLogin,
}) => (
  <section className="login">
    <AuthForm
      type={loginType}
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
