import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faTrash } from "@fortawesome/free-solid-svg-icons";


function Tweet(props) {
  return (
    <div className={styles.LastTweetsContainer}>
      <div className={styles.userline}>
        <img className={styles.profilPhoto} />
        <p className={styles.userName}>{props.username}</p>
        <p className={styles.accountName}>@username and firstname . time</p>
      </div>
      <div className={styles.tweetline}>
        {props.tweet}
      </div>
      <div className={styles.activitesLine}>{/* mettre like et corbeil */}
        <FontAwesomeIcon icon={faHeart} />
         <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
