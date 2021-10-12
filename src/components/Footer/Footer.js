import './Footer.css';

const Footer = ({ pathname }) => {
  const footerClassName = (
    `footer
    ${(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && 'footer_visible'}`
  );
  return (
    <footer className={footerClassName}>
      <div className="footer__container">
        <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm</p>
        <div className="footer__info">
          <p className="footer__date">&copy; <span id="year">{new Date().getFullYear()}</span></p>
          <ul className="footer__links">
            <li className="footer__item">
              <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com/k3499" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://www.facebook.com/profile.php?id=100001348617211" target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
