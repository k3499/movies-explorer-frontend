import './AboutProject.css';

const AboutProject = () => (
  <section className="aboutProject" id="project">
    <div className="aboutProject__container">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__infoContainer">
        <div className="aboutProject__infoBlock">
          <h3 className="aboutProject__infoBlockTitle">Дипломный проект включал 5 этапов</h3>
          <div className="aboutProject__infoBlockText">Составление плана, работу над бэкендом,
          вёрстку, добавление функциональности и финальные доработки.</div>
        </div>
        <div className="aboutProject__infoBlock">
          <h3 className="aboutProject__infoBlockTitle">На выполнение диплома ушло 5 недель</h3>
          <div className="aboutProject__infoBlockText">У каждого этапа был мягкий и жёсткий
          дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
        </div>
      </div>
      <div className="aboutProject__timeBlock">
          <div className="aboutProject__timeblockBack">
            <div className="aboutProject__timeblockBackDate">1 неделя</div>
            <div className="aboutProject__timeblockBackTitle">Back-end</div>
          </div>
          <div className="aboutProject__timeblockFront">
            <div className="aboutProject__timeblockFrontDate">4 недели</div>
            <div className="aboutProject__timeblockFrontTitle">Front-end</div>
          </div>
        </div>
    </div>
  </section>
);

export default AboutProject;
