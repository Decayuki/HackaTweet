import styles from "../styles/Home.module.css";
import Trend from "./Trend";
import LastTweets from "./LastTweets";
import { useState } from "react";
import { useAddTweetMutation } from "../Redux/Services/tweetApi";

function Home() {
  const [tweetContent, setTweetContent] = useState("");

  // hook RTK mutation 
  const [addTweet, { isLoading }] = useAddTweetMutation();
  const handleTweetSubmit = async () => {
    if (!tweetContent.trim()) return;

    try {
      const res = await addTweet({ text: tweetContent });

      if (res.data?.result) {
        setTweetContent("");
      } else {
        alert(res.data?.error || "Erreur lors de l’envoi du tweet");
      }
    } catch (error) {
      alert("Erreur serveur");
    }
  };

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
            placeholder="What's up"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
          />
          <div className={styles.buttonLine}>
            <p>{tweetContent.length}/280</p>
            <button
              className={styles.buttonStyle}
              onClick={handleTweetSubmit}
              disabled={isLoading || tweetContent.length === 0}
            >
              Tweet
            </button>
          </div>
        </div>

        {/* RTK : affiche les tweets depuis LastTweets (RTK Query) */}
        <div className={styles.lastTweetsContainer}>
          <LastTweets />
        </div>
      </main>

      {/* Partie à droite */}
      <div className={styles.rightSection}>
        <h1>Trends</h1>
        <div className={styles.trendContainer}>
          <Trend />
        </div>
      </div>
    </div>
  );
}

export default Home;