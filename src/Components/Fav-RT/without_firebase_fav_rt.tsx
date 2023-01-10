import React, { useState } from "react";
import axios from "axios";

const FavRT: React.FC = () => {
  const [error, setError] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const handleFavorite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/favorites", {
        tweetId,
        favorite: !isFavorited,
      });

      if (res.status === 200) {
        console.log(
          `Successfully ${isFavorited ? "unfavorited" : "favorited"} tweet`
        );
        setIsFavorited(!isFavorited);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Error favoriting tweet");
    }
  };

  const handleRetweet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/retweets", {
        tweetId,
        retweet: !isRetweeted,
      });

      if (res.status === 200) {
        console.log(
          `Successfully ${isRetweeted ? "unretweeted" : "retweeted"} tweet`
        );
        setIsRetweeted(!isRetweeted);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Error retweeting tweet");
    }
  };

  return (
    <div>
      <button onClick={handleFavorite}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
      <button onClick={handleRetweet}>
        {isRetweeted ? "Unretweet" : "Retweet"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FavRT;
