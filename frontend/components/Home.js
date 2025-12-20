import styles from "../styles/Home.module.css";
import Tweet from "../components/Tweet";
import Trend from "./Trend";
import { useState, useEffect } from "react";

function Home() {
  const [tweets, setTweets] = useState([]); // tableau
  const [token, setToken] = useState(""); // mets ton token ici (ex localStorage)
  const [userId, setUserId] = useState(""); // mets ton userId ici

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  // charger les tweets

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((res) => res.json())
      .then((data) => {
        // prendre partie []: data = { result: true, tweets: [] }
        if (data.result && Array.isArray(data.tweets)) {
          setTweets(data.tweets);
        } else {
          setTweets([]);
        }
      })
      .catch(() => setTweets([]));
  }, []);

  const onUpdateLikes = (tweetId, likes) => {
    // tweetId → l’ID du tweet cliqué
    // likes → le nouveau tableau de likes renvoyé par le backend
    setTweets((prev) =>
      // On parcourt tous les tweets,retourne un nouveau tableau
      prev.map((t) => (t._id === tweetId ? { ...t, likes } : t))
    );
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
            placeholder="Whta'up"
          />
          <div className={styles.buttonLine}>
            <p>28/280</p>
            <button className={styles.buttonStyle}>Tweet</button>
          </div>
        </div>

        <div className={styles.lastTweetsContainer}>
          {/* ====> mettre composant : Tweet.js*/}
          {tweets.map((tweet) => (
            <Tweet
              key={tweet._id}
              tweetId={tweet._id}
              tweet={tweet.text}
              username={tweet.user.username}
              firstname={tweet.user.firstname}
              likes={Array.isArray(tweet.likes) ? tweet.likes : []}
              token={token}
              userId={tweet.likes}
              onUpdateLikes={onUpdateLikes}
              createdAt={tweet.createdAt}
            />
          ))}
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
