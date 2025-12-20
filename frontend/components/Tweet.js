import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLikeTweetMutation } from "../../Redux/Services/tweetApi";

function Tweet(props) {
  // uniquement utiliser quand props.likes est un format tableau, quand ce undefined -> n'est pas tableau 
const [likes, setLikes] = useState(Array.isArray(props.likes) ? props.likes : []);

<<<<<<< HEAD
// Update avec utilisation de la mutation RTK
  const [likeTweet] = useLikeTweetMutation(); 

  const handleLike = async () => {
    try {
      const { data } = await likeTweet(props.tweetId);

      if (data?.result) {
        setLikes(data.likes);       // mise à jour du nombre
        setIsLiked(true);           // cœur en rouge
      }
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  // Old version fetch direct en bd
  // const handleLike = () => {
  //   fetch(`http://localhost:3000/tweets/${props.tweetId}/like`, {
  //     method: "PUT",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.result) {
  //         setLikes(data.likes); // nombre
  //         setIsLiked(true); // cœur rouge
  //       }
  //     })
  //     .catch(console.log);
  // };
=======
  const handleLike = () => {
    fetch(`http://localhost:3000/tweets/${props.tweetId}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: props.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setLikes(data.likes); // tableau
        }
      })
      .catch(console.log);
  };

  // coeur rouge si ce userId est dans likes[]
  const isLiked =
    props.userId && Array.isArray(likes)
      ? likes.some((id) => id.toString() === props.userId.toString())
      : false;

>>>>>>> 04d6f736227168b8e234daf48950239f260bea04

  function formatTweetDate(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const diffMs = now - createdDate;
    const diffSeconds = Math.floor(diffMs / 1000);
    if (diffSeconds < 60) {
      return `${diffSeconds}s`;
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes}min`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours}h`;
    }

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}j`;
  }

  return (
    <div className={styles.LastTweetsContainer}>
      <div className={styles.userline}>
        <img className={styles.profilPhoto} />
        <p className={styles.userName}>{props.username}</p>
        <p className={styles.accountName}>
          @{props.username}
          {props.firstname} . {formatTweetDate(props.createdAt)}
        </p>
      </div>
      <div className={styles.tweetline}>{props.tweet}</div>
      <div className={styles.activitesLine}>
        {/* mettre like et corbeil */}
        <FontAwesomeIcon
          onClick={handleLike}
          icon={faHeart}
          style={{ color: isLiked ? "red" : "grey" }}
        />
        <span>{likes.lentgth}</span>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
