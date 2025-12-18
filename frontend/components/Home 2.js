import styles from "../styles/Home.module.css";
import Tweet from "../components/Tweet";
import Trend from "./Trend";

function Home() {
  return (
    <div className={styles.container}>
      {/* Partie à gauche */}
      <div className={styles.leftSection}>
        <div className={styles.logoBloc}>
          <img src="/logo.png" alt="Tweet Logo" className={styles.logo} />
        </div>
        <div className={styles.userBottom}>
          <div className={styles.accountBloc}>
            <div>
              <img className={styles.profilPhoto} />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>John</p>
              <p className={styles.accountName}>@JohnCena</p>
            </div>
          </div>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {/* Partie milieu - main content */}
      <main className={styles.mainContent}>
        <div className={styles.publieContainer}>
          <h1>Home</h1>
          <input
            className={styles.inputStyle}
            type="text"
            placeholder="Whta'up"
          />
          <div className={styles.buttonLine}>
            <p>28/280</p>
            <button className={styles.buttonStyle}>Tweet</button>
          </div>
        </div>

        <div className={styles.lastTweetsContainer}>
          {/* ====> mettre composant : Tweet.js*/}
          <Tweet />
        </div>
      </main>

      {/* Partie à droite */}
      <div className={styles.rightSection}>
        <h1>Trends</h1>
        <div className={styles.trendContainer}>
          {/* Partie composant: Trend.js */}
          <Trend />
        </div>
      </div>
    </div>
  );
}

export default Home;
