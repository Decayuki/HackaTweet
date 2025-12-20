import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Tweet(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(
    typeof props.likes === "number" ? props.likes : 0
  );

  const handleLike = () => {
    fetch(`http://localhost:3000/tweets/${props.tweetId}/like`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setLikes(data.likes); // nombre
          setIsLiked(true); // cœur rouge
        }
      })
      .catch(console.log);
  };

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
          style={{ color: isLiked ? "red" : "grey", cursor: "pointer" }}
        />
        <span>{likes}</span>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
