import './Popup.css';

const Popup = ({
  closePopup,
  isOpen,
  message,
}) => (
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={closePopup}></button>
        <p className="popup__message">{message}</p>
      </div>
    </section>
);

export default Popup;
