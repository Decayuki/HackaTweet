import styles from "../styles/Trend.module.css";

function Trend(props) {
  return (
    <div className={styles.hashtagLine}>
      <p className={styles.hashtag}>{props.hashtag}</p>
      <p className={styles.counter}> X Tweets</p>
    </div>
  );
}

export default Trend;
