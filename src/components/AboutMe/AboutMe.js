import './AboutMe.css';

const AboutMe = () => (
  <section className="aboutMe" id="student">
    <div className="aboutMe__container">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__infoContainer">
        <div className="aboutMe__infoDescr">
          <h3 className="aboutMe__name">Кирилл</h3>
          <p className="aboutMe__job">Фронтенд-разработчик, 27 лет</p>
          <p className="aboutMe__description">Я живу в москве, закончил факультет прикладной информатики в МЭИ.
           Кодил все время, сколько я себя помню. Постоянно делаю WEB проекты.
           Закончил курс Яндекс Практикум для повышения квалификации и
           соответственно качества своих проектов.</p>
          <div className="aboutMe__social">
            <a href="https://github.com/k3499" target="_blank" className="aboutMe__socialLink">Facebook</a>
            <a href="https://www.facebook.com/profile.php?id=100001348617211" target="_blank" className="aboutMe__socialLink">Github</a>
          </div>
        </div>
        <div className="aboutMe__avatar"></div>
      </div>
    </div>
  </section>
);

export default AboutMe;
