import styles from "../styles/Trend.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Trend(props) {
  const [hashtags, setHashtags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/hashtags")
      .then((res) => res.json())
      .then((data) => {
        if (data.result && Array.isArray(data.hashtags)) {
          setHashtags(data.hashtags);
        } else {
          setHashtags([]);
        }
      })
      .catch(() => setHashtags([]));
  }, []);

  const goToHashtag = (tag) => {
    // tag = "#react" -> "react"
    const slug = tag.startsWith("#") ? tag.slice(1) : tag;
    router.push(`/hashtag/${slug}`);
  };

  return (
    <div className={styles.hashtagLine}>
      <p className={styles.hashtag}>
        {hashtags.map((h) => (
          <div
            key={h._id}
            onClick={() => goToHashtag(h.tag)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 8,
              gap: 10,
            }}
          >
            <span>{h.tag}</span>
            <span className={styles.counter}>{h.tweets.length} tweets</span>
          </div>
        ))}
      </p>
    </div>
  );
}

export default Trend;
