import './AboutTechs.css';

const AboutTechs = () => (
  <div className="aboutTechs">
    <div className="aboutTechs__container">
      <h2 className="aboutTechs__title">Технологии</h2>
      <h3 className="aboutTechs__titleNum">7 технологий</h3>
      <p className="aboutTechs__subTitleNum">На курсе веб-разработки
      мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="aboutTechs__list">
        <li className="aboutTechs__listElement">HTML</li>
        <li className="aboutTechs__listElement">CSS</li>
        <li className="aboutTechs__listElement">JS</li>
        <li className="aboutTechs__listElement">React</li>
        <li className="aboutTechs__listElement">Git</li>
        <li className="aboutTechs__listElement">Express.js</li>
        <li className="aboutTechs__listElement">MongoDB</li>
      </ul>
    </div>
  </div>
);

export default AboutTechs;
