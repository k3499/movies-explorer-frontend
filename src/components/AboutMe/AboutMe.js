import './AboutMe.css';

const AboutMe = () => (
  <div className="aboutMe">
    <div className="aboutMe__container">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__infoContainer">
        <div className="aboutMe__infoDescr">
          <h3 className="aboutMe__name">Кирилл</h3>
          <p className="aboutMe__job">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
  и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
  работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал
  заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <div className="aboutMe__social">
            <a href="" className="aboutMe__socialLink">Facebook</a>
            <a href="" className="aboutMe__socialLink">Github</a>
          </div>
        </div>
        <div className="aboutMe__avatar"></div>
      </div>
    </div>
  </div>
);

export default AboutMe;
