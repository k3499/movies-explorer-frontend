import { useHistory } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button className="not-found__link" onClick={goBack}>Назад</button>
    </section>
  );
};

export default NotFound;
