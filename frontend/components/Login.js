import styles from "../styles/Login.module.css";
import { useState } from "react";
import Modal from "./Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login() {
  const [openModal, setOpenModal] = useState(null);
  //  définir fermer la fenêtre
  function closeModal() {
    setOpenModal(null);
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftContainer}>
          <img src="/photo-left.png" className={styles.img} />
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" className={styles.logo} />
          </div>
          <div className={styles.titleContainer}>
            See what’s <br />
            happening
          </div>
          <div className={styles.loginContainer}>
            <div className={styles.texte}>Join Hackatweet today.</div>
            <div className={styles.buttonContainer}>
              {/* Quand on click le bouton donner openModal un valeur pour déclencher l'ouvre de la fenêtre */}
              <button
                className={`${styles.loginbutton} ${styles.signup}`}
                onClick={() => setOpenModal("signup")}
              >
                Sign up
              </button>

              <p>Already have an account?</p>

              <button
                className={`${styles.loginbutton} ${styles.signout}`}
                onClick={() => setOpenModal("signin")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
      <Modal isOpen={openModal !== null} onClose={closeModal}>
        {openModal === "signup" && <SignUp />}
        {openModal === "signin" && <SignIn />}
      </Modal>
    </div>
  );
}

export default Login;
