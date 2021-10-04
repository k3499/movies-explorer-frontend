import './Popup.css';

const Popup = ({
  closePopup,
  isOpen,
  isFailed,
}) => (
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={closePopup}></button>
        <p className="popup__message">
          {isFailed
            ? 'Произошла ошибка! Попробуйте ещё раз.'
            : 'Вы успешно зарегистрированы!'
          }
        </p>
      </div>
    </section>
);

export default Popup;
