import AuthForm from '../AuthForm/AuthForm';
import './Register.css';
import { registerType } from '../../utils/constants';

const Register = ({
  onRegister,
}) => (
  <section className="register">
    <AuthForm
      type={registerType}
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
