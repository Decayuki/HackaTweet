import styles from "../styles/Modale.module.css";

function SignUp() {
  return (
    <div>
      
            <div className={styles.logoContainer}>
                <img src="/logo.png" className={styles.logo}/>
            </div>
            <span className={styles.texte}>
                <p>Create your Hackatweet account</p>
            </span>
            <div className={styles.informationContainer}>
                <input type="text" placeholder="Firstname"/>
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <button className={styles.signUpButton}>Sign up</button>
            </div>
      
    </div>
  );
}

export default SignUp;