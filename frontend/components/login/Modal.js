import styles from "../../styles/Modale.module.css";

function Modal(props) {
  if (!props.isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };
  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={props.onClose}>
          X
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
