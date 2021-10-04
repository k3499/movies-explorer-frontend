import './Portfolio.css';

const Portfolio = () => (
  <section className="portfolio">
    <div className="portfolio__container">
      <h2 className="portfolio__title">Портфолио</h2>
      <a href="https://github.com/k3499/mesto" target="_blank" className="portfolio__link">Статичный сайт</a>
      <a href="https://github.com/k3499/russian-travel" target="_blank" className="portfolio__link">Адаптивный сайт</a>
      <a href="https://github.com/k3499/react-mesto-api-full" target="_blank" className="portfolio__link">Одностраничное приложение</a>
    </div>
  </section>
);

export default Portfolio;
