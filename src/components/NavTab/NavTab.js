import './NavTab.css';

const NavTab = () => (
  <nav className="navTab">
    <ul className="navTab__list">
      <li className="navTab__item"><a className="navTab__link" href="">О проекте</a></li>
      <li className="navTab__item"><a className="navTab__link" href="">Технологии</a></li>
      <li className="navTab__item"><a className="navTab__link" href="">Студент</a></li>
    </ul>
  </nav>
);

export default NavTab;
