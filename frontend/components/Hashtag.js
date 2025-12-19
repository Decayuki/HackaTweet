import styles from "../styles/Home.module.css";
import Tweet from "../components/Tweet";
import Trend from "./Trend";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Hashtag() {
  const [token, setToken] = useState(""); // mets ton token ici (ex localStorage)
  const [userId, setUserId] = useState(""); // mets ton userId ici

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  const router = useRouter();
  const { tag } = router.query; // ex: "dev"

  const [hashtagValue, setHashtagValue] = useState("");
  const [tweets, setTweets] = useState([]);

  const [inputValue, setInputValue] = useState(""); // contenu de l'input

  // 1) Quand l'URL change (tag), on met à jour l'input + on fetch les tweets
  useEffect(() => {
    if (!tag) return;

    // afficher "#dev" dans l'input
    setHashtagValue(`#${tag}`);

    // appeler GET /hashtags/:tag (sans #)
    fetch(`http://localhost:3000/hashtags/${tag}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.hashtag && Array.isArray(data.hashtag.tweets)) {
          setTweets(data.hashtag.tweets);
        } else {
          setTweets([]);
        }
      })
      .catch(() => setTweets([]));
  }, [tag]);

  // 2) Enter => navigue vers le nouveau hashtag
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const raw = inputValue.trim();
    if (!raw) return;

    // accepte "#react" ou "react"
    const slug = raw.startsWith("#") ? raw.slice(1) : raw;

    // nettoie / standardise
    const clean = slug.toLowerCase();

    router.push(`/hashtag/${clean}`);
  };

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
          <h1>Hashtag</h1>
          <input
            className={styles.inputStyle}
            type="text"
            placeholder="input hashtag"
            defaultValue={hashtagValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={styles.lastTweetsContainer}>
          {/* ====> mettre composant : Tweet.js*/}
          {tweets.map((t) => (
            <Tweet
              key={t._id}
              tweetId={t._id}
              tweet={t.text}
              username={t.user.username}
              likes={Array.isArray(t.likes) ? t.likes : []}
              token={token}
              userId={userId}
              onUpdateLikes={onUpdateLikes}
              createdAt={t.createdAt}
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

export default Hashtag;
