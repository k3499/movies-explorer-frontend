import './NavTab.css';
import { Link } from 'react-scroll';

const NavTab = () => (
  <nav className="navTab">
    <ul className="navTab__list">
      <li className="navTab__item">
        <Link activeClass="active" className="navTab__link" to="project" spy={true} smooth={true} duration={800}>О проекте</Link>
      </li>
      <li className="navTab__item">
        <Link activeClass="active" className="navTab__link" to="tech" spy={true} smooth={true} duration={800}>Технологии</Link>
      </li>
      <li className="navTab__item">
        <Link activeClass="active" className="navTab__link" to="student" spy={true} smooth={true} duration={800}>Студент</Link>
      </li>
    </ul>
  </nav>
);

export default NavTab;
