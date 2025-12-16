import styles from "../styles/Login.module.css";
import Link from "next/link";

function Login() {
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
              <Link href="/modaleSignUp">
                <button className={`${styles.loginbutton} ${styles.signup}`}>
                  Sign up
                </button>
              </Link>
              <p>Already have an account?</p>

              <Link href="/modaleSignIn">
                <button className={`${styles.loginbutton} ${styles.signout}`}>
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
