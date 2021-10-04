import { NavLink } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <NavLink to="/" className="not-found__link">Назад</NavLink>
    </section>
);

export default NotFound;
